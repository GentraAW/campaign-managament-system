package com.example.springboot_cms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.services.CampaignInfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/campaigns")
@RequiredArgsConstructor
public class CampaignInfoController {

    private final CampaignInfoService campaignInfoService;

    @GetMapping
    public List<CampaignInfoModel> getAllCampaigns() {
        return campaignInfoService.findAll();
    }

    @PostMapping
    public ResponseEntity<CampaignInfoModel> createCampaign(
        @RequestBody CampaignInfoModel campaignInfo,
        @RequestParam String name,
        @RequestParam String businessField, 
        @RequestParam String description,
        @RequestParam Long targetAudience
        ) {
        try {
            CampaignInfoModel createdCampaign = campaignInfoService.save(campaignInfo);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCampaign);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
 
    @PutMapping("/{id}")
    public ResponseEntity<CampaignInfoModel> updateCampaign(
        @PathVariable Long id, 
        @RequestParam String name,
        @RequestParam String businessField,
        @RequestParam String description,
        @RequestParam Long targetAudience
        ) {
        CampaignInfoModel updatedCampaign = new CampaignInfoModel();
        updatedCampaign.setCampaignInfoId(id);
        updatedCampaign.setName(name);
        updatedCampaign.setDescription(description);
        updatedCampaign.setTargetAudience(targetAudience);

        try {
            CampaignInfoModel campaignInfoModel = campaignInfoService.update(id, updatedCampaign);
            return campaignInfoModel != null ? ResponseEntity.ok(campaignInfoModel) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCampaign(@PathVariable Long id) {
        try {
            campaignInfoService.delete(id);
            return ResponseEntity.ok("Campaign id: " + id + " berhasil di delete");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed delete campaign dengan id: " + id);
        }
    }
}
