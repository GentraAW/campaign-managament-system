package com.example.springboot_cms.services;

import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.model.CustomerModel;
import com.example.springboot_cms.model.EmailMassLogModel;
import com.example.springboot_cms.repository.CampaignInfoRepository;
import com.example.springboot_cms.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MassEmailService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final CustomerService customerService;
    private final CampaignInfoService campaignInfoService;
    private final EmailMassLogService emailMassLogService;

    private final CampaignInfoRepository campaignInfoRepository;
    private final CustomerRepository customerRepository;

    // public void sendMassEmails(Long campaignId) {
    //     CampaignInfoModel campaign = campaignInfoService.findById(campaignId);
    //     List<CustomerModel> customers = customerService.findAll();

    //     redisTemplate.opsForValue().set("massEmailProcess", "started");

    //     // Simulasi pengiriman email massal dengan membuat log secara acak
    //     emailMassLogService.createRandomLogs(customers, campaign);

    //     redisTemplate.opsForValue().set("massEmailProcess", "completed");
    // }

    public void startMassEmailProcess(Long campaignId) {
        CampaignInfoModel campaign = campaignInfoRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        List<CustomerModel> customers = customerRepository.findAll();
        for (CustomerModel customer : customers) {
            EmailMassLogModel log = EmailMassLogModel.builder()
                    .customer(customer)
                    .campaign(campaign)
                    .timestamp(new java.sql.Timestamp(System.currentTimeMillis()))
                    .build();
            emailMassLogService.saveLog(log);
        }
        
        redisTemplate.opsForValue().set("mass_email_status", "Mass email process started");
    }
}