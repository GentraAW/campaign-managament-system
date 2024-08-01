package com.example.springboot_cms.services;

import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.model.CustomerModel;
import com.example.springboot_cms.repository.CampaignInfoRepository;
import com.example.springboot_cms.repository.CustomerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.InternetAddress;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.beans.factory.annotation.Value;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CampaignInfoRepository campaignInfoRepository;

    @Autowired
    private StringRedisTemplate redisTemplate;

    private AtomicInteger espCounter = new AtomicInteger(0);
    private static final String[] ESP_LIST = {"ESP1", "ESP2", "ESP3", "ESP4"};
    private static final int MAX_RETRY_COUNT = 3;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${spring.mail.sender.name}")
    private String senderName;

    public void sendBroadcastEmail(Long id) {
        CampaignInfoModel campaignInfoModel = campaignInfoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID kampanye tidak valid"));

        int page = 0;
        int size = 4;  // email per batch
        Page<CustomerModel> emailPage;

        do {
            emailPage = customerRepository.findAll(PageRequest.of(page, size));
            for (CustomerModel emailBroadcast : emailPage.getContent()) {
                // Menggunakan HTML dalam konten email
                String emailBody = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; font-size: 17px;\"><strong>Dear " 
                                    + emailBroadcast.getCompanyName() + "</strong>,</div><br>" +
                                    campaignInfoModel.getDescription();
                addEmailToQueue(emailBroadcast.getEmail(), campaignInfoModel.getTitle(), emailBody);
            }
            processEmailQueue();
            page++;
        } while (emailPage.hasNext());
    }

    public void addEmailToQueue(String email, String subject, String message) {
        Map<String, Object> emailData = Map.of("email", email, "subject", subject, "message", message, "retryCount", 0);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(emailData);
            redisTemplate.opsForList().rightPush("emailQueue", json);
            redisTemplate.opsForHash().put("emailStatus", email, "pending");
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Gagal melakukan serialisasi data email", e);
        }
    }

    public void processEmailQueue() {
        while (true) {
            String result = redisTemplate.opsForList().leftPop("emailQueue");
            if (result != null && !result.isEmpty()) {
                try {
                    Map<String, Object> emailData = new ObjectMapper().readValue(result, Map.class);
                    String email = (String) emailData.get("email");
                    String subject = (String) emailData.get("subject");
                    String message = (String) emailData.get("message");
                    int retryCount = (int) emailData.get("retryCount");

                    String esp = assignToESP();
                    boolean isSent = sendEmail(email, subject, message, esp);
                    
                    if (isSent) {
                        redisTemplate.opsForHash().put("emailStatus", email, "sent");
                    } else if (retryCount < MAX_RETRY_COUNT) {
                        emailData.put("retryCount", retryCount + 1);
                        redisTemplate.opsForList().rightPush("emailQueue", new ObjectMapper().writeValueAsString(emailData));
                        redisTemplate.opsForHash().put("emailStatus", email, "retrying");
                    } else {
                        redisTemplate.opsForHash().put("emailStatus", email, "failed");
                        System.err.println("Failed to send email to: " + email);
                    }
                    
                } catch (IOException e) {
                    throw new RuntimeException("Gagal melakukan deserialisasi data email", e);
                }
            } else {
                break;
            }
        }
    }

    private boolean sendEmail(String to, String subject, String htmlContent, String esp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); 
            helper.setFrom(new InternetAddress(fromEmail, senderName)); // Set from dengan nama pengirim
            helper.setTo(to);
            helper.setSubject(subject);

            // Menggunakan HTML dalam konten email
            String htmlContentWithStyledDiv = htmlContent.replace("<br>", "<div style=\"padding-bottom: 1px\"></div>");
            String htmlContentWithStyledP = htmlContentWithStyledDiv.replace("<p>", "<p style=\"margin: 0.8em\"></p>");
            String styledContent = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; max-width: 800px; margin: auto; background-color: #f0f0f0; padding: 20px;\">" +
                                "<div style=\"background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\">" +
                                htmlContentWithStyledP + "</div></div>";

            helper.setText(styledContent, true); 
            mailSender.send(message);
            return true;
        } catch (MessagingException | UnsupportedEncodingException e) {
            System.err.println("Error sending email: " + e.getMessage());
            return false;
        }
    }

    public void deleteAllEmailStatusEntries() {
        Set<Object> keysObj = redisTemplate.opsForHash().keys("emailStatus");
        if (keysObj != null) {
            Set<String> keys = Stream.of(keysObj.toArray()).map(Object::toString).collect(Collectors.toSet());
            redisTemplate.opsForHash().delete("emailStatus", keys.toArray());
        }
    }

    private String assignToESP() {
        int currentEspIndex = espCounter.getAndIncrement() % ESP_LIST.length;
        return ESP_LIST[currentEspIndex];
    }
}