package com.example.springboot_cms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<?> getAllCampaigns() {
        List<CampaignInfoModel> campaign= campaignInfoService.findAll();
        if(campaign.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tidak ada data");
        }else{
            return ResponseEntity.ok(campaign);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCampaignById(@PathVariable Long id) {
        CampaignInfoModel campaign = campaignInfoService.findById(id);
        if (campaign == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id : " + id + " tidak ditemukan");
        }else{
            return ResponseEntity.ok(campaign);
        }
        
    }

    @PostMapping
    public ResponseEntity<CampaignInfoModel> createCampaign(
        @RequestBody CampaignInfoModel campaignInfo
        ) {
        try {
            CampaignInfoModel createdCampaign = campaignInfoService.save(campaignInfo.getName(), campaignInfo.getTitle(), campaignInfo.getDescription());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCampaign);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCampaign(@PathVariable Long id) {
        boolean deleted = campaignInfoService.delete(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id : " + id + " tidak ditemukan");
        }
        return ResponseEntity.ok("Berhasil dihapus " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCampaign(@PathVariable Long id, @RequestBody CampaignInfoModel campaignInfo) {
        Optional<CampaignInfoModel> campaign = campaignInfoService.update(id, campaignInfo);
        try{
            if(campaign.isPresent()){
                return ResponseEntity.ok(campaign.get());
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id : " + id + "Tidak tersedia");
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }

}
