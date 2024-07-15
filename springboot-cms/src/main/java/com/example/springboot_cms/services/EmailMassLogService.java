package com.example.springboot_cms.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.example.springboot_cms.repository.EmailMassLogRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.model.CustomerModel;
import com.example.springboot_cms.model.EmailMassLogModel;

@Service
@RequiredArgsConstructor
public class EmailMassLogService {

    private final EmailMassLogRepository emailMassLogRepository;

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void createRandomLogs(List<CustomerModel> customers, CampaignInfoModel campaign) {
        customers.forEach(customer -> {
            EmailMassLogModel log = new EmailMassLogModel();
            log.setCustomer(customer);
            log.setCampaign(campaign);
            emailMassLogRepository.save(log);
        });
    }

    public List<EmailMassLogModel> getAllLogs() {
        return emailMassLogRepository.findAll();
    }

    public EmailMassLogModel saveLog(EmailMassLogModel log) {
        return emailMassLogRepository.save(log);
    }

    //Coba baru
    public void addEmailToQueue(String email, String message) {
        Map<String, String> emailData = Map.of("email", email, "message", message);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(emailData);
            redisTemplate.opsForList().rightPush("emailQueue", json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize email data", e);
        }
    }

    public Map<String, String> getNextEmailFromQueue() {
        String result = redisTemplate.opsForList().leftPop("emailQueue");
        if (result != null && !result.isEmpty()) {
            try {
                Map<String, String> emailData = new ObjectMapper().readValue(result, Map.class);
                return emailData;
            } catch (IOException e) {
                throw new RuntimeException("Failed to deserialize email data", e);
            }
        }
        return null;
    }

    public void logEmail(String email, String message) {
        EmailMassLogModel emailMassLog = new EmailMassLogModel();
        emailMassLog.setEmail(email);
        emailMassLog.setMessage(message);
        emailMassLog.setStatus("pending");
        emailMassLogRepository.save(emailMassLog);
    }

    public void processEmailQueue() {
        Map<String, String> emailData;
        while ((emailData = getNextEmailFromQueue()) != null) {
            String email = emailData.get("email");
            String message = emailData.get("message");
            logEmail(email, message);
        }
    }
}
