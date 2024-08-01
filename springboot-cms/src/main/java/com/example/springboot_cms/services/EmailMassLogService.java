package com.example.springboot_cms.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.model.CustomerModel;
import com.example.springboot_cms.model.EmailMassLogModel;
import com.example.springboot_cms.repository.EmailMassLogRepository;
import com.example.springboot_cms.repository.CustomerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class EmailMassLogService {

    private static final Logger logger = LoggerFactory.getLogger(EmailMassLogService.class);

    private final EmailMassLogRepository emailMassLogRepository;
    private final CustomerRepository customerRepository;
    @Autowired
    private StringRedisTemplate redisTemplate;

    private AtomicInteger espCounter = new AtomicInteger(0);
    private static final String[] ESP_LIST = {"ESP1", "ESP2", "ESP3", "ESP4"};

    // Menambahkan email ke antrian
    public void addEmailToQueue(String email, String message) {
        Map<String, String> emailData = Map.of("email", email, "message", message);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(emailData);
            redisTemplate.opsForList().rightPush("emailQueue", json);
            logger.info("Email ditambahkan ke antrian: {}", email);
        } catch (JsonProcessingException e) {
            logger.error("Gagal melakukan serialisasi data email", e);
            throw new RuntimeException("Gagal melakukan serialisasi data email", e);
        }
    }

    // Mendapatkan email berikutnya dari antrian
    public Map<String, String> getNextEmailFromQueue() {
        String result = redisTemplate.opsForList().leftPop("emailQueue");
        if (result != null && !result.isEmpty()) {
            try {
                Map<String, String> emailData = new ObjectMapper().readValue(result, Map.class);
                logger.info("Email diambil dari antrian: {}", emailData.get("email"));
                return emailData;
            } catch (IOException e) {
                logger.error("Gagal melakukan deserialisasi data email", e);
                throw new RuntimeException("Gagal melakukan deserialisasi data email", e);
            }
        }
        return null;
    }

    // Mencatat email ke database
    public void logEmail(String email, String message, String status, CampaignInfoModel campaign, CustomerModel customer, String espName) {
        EmailMassLogModel emailMassLog = new EmailMassLogModel();
        emailMassLog.setEmail(email);
        emailMassLog.setMessage(message);
        emailMassLog.setStatus(status);
        emailMassLog.setCampaign(campaign);
        emailMassLog.setCustomer(customer);
        emailMassLog.setEspName(espName);
        emailMassLogRepository.save(emailMassLog);
        logger.info("Email dicatat di database: {}", email);
    }

    // Memproses antrian email dan mengirim email menggunakan algoritma round robin
    public void processEmailQueue(CampaignInfoModel campaign) {
        logger.info("Memulai pemrosesan antrian email untuk kampanye: {}", campaign.getName());
        Map<String, String> emailData;
        while ((emailData = getNextEmailFromQueue()) != null) {
            String email = emailData.get("email");
            String message = emailData.get("message");
            
            // Menetapkan ke ESP menggunakan Round Robin
            String esp = assignToESP();

            // Mensimulasikan proses pengiriman email
            sendEmail(email, message, esp);

            CustomerModel customer = customerRepository.findByEmail(email);

            // Mencatat email dengan nama ESP sebagai string
            logEmail(email, message, "sent", campaign, customer, esp);
        }
    }

    // Penetapan Round Robin untuk ESPs
    private String assignToESP() {
        int currentEspIndex = espCounter.getAndIncrement() % ESP_LIST.length;
        return ESP_LIST[currentEspIndex];
    }

    // Mensimulasikan pengiriman email
    private void sendEmail(String email, String message, String esp) {
        logger.info("Mengirim email ke {} menggunakan {}", email, esp);
    }

    public void addEmailsToQueueForCampaign(Long campaignId) {
        List<CustomerModel> customers = customerRepository.findAll();
        for (CustomerModel customer : customers) {
            addEmailToQueue(customer.getEmail(), "Pesan untuk campaign " + campaignId);
        }
    }
}
