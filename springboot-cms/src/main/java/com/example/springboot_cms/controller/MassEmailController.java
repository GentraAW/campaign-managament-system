package com.example.springboot_cms.controller;

import com.example.springboot_cms.services.EmailMassLogService;
import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.repository.CampaignInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mass-email")
public class MassEmailController {
    @Autowired
    private EmailMassLogService emailMassLogService;

    @Autowired
    private CampaignInfoRepository campaignInfoRepository;

    @PostMapping("/send/{campaignId}")
    public ResponseEntity<String> sendMassEmail(@PathVariable Long campaignId) {
        try {
            CampaignInfoModel campaign = campaignInfoRepository.findById(campaignId)
                    .orElseThrow(() -> new IllegalArgumentException("ID kampanye tidak valid"));

            emailMassLogService.addEmailsToQueueForCampaign(campaignId);
            emailMassLogService.processEmailQueue(campaign);

            return ResponseEntity.ok("Proses pengiriman berhasil! untuk kampanye ID: " + campaignId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Terjadi kesalahan: " + e.getMessage());
        }
    }
    
}
