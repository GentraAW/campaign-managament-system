package com.example.springboot_cms.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.repository.CampaignInfoRepository;
import com.example.springboot_cms.repository.EmailMassLogRepository;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CampaignInfoService {

    private final CampaignInfoRepository campaignInfoRepository;

    private final EmailMassLogRepository emailMassLogRepository;

    public List<CampaignInfoModel> findAll() {
        return campaignInfoRepository.findAll();
    }

    public CampaignInfoModel save(String name, String title, String description ) {
        CampaignInfoModel campaignInfo = new CampaignInfoModel();
        campaignInfo.setName(name);
        campaignInfo.setTitle(title);
        campaignInfo.setDescription(description);

        return campaignInfoRepository.save(campaignInfo);
    }

    public Optional<CampaignInfoModel> update(Long id, CampaignInfoModel updatedCampaignInfo) {
        Optional<CampaignInfoModel> campaign = campaignInfoRepository.findById(id);
        if(campaign.isPresent()){
            CampaignInfoModel existingCampaign = campaign.get();
            if(updatedCampaignInfo.getName() != null){
                existingCampaign.setName(updatedCampaignInfo.getName());
            }
            if(updatedCampaignInfo.getTitle() != null){
                existingCampaign.setTitle(updatedCampaignInfo.getTitle());
            }
            if(updatedCampaignInfo.getDescription() != null){
                existingCampaign.setDescription(updatedCampaignInfo.getDescription());
            }

        return Optional.of(campaignInfoRepository.save(existingCampaign));

        }else{
            return Optional.empty();
        }
        
    }

    @Transactional
    public boolean delete(Long id) {
        try {
            log.info("Attempting to delete campaign with id: {}", id);
            Optional<CampaignInfoModel> campaign = campaignInfoRepository.findById(id);
            if (campaign.isPresent()) {
                emailMassLogRepository.deleteByCampaign_CampaignInfoId(id);
                campaignInfoRepository.deleteById(id);
                log.info("Campaign with id: {} has been deleted", id);
                return true;
            } else {
                log.warn("Campaign with id: {} not found", id);
                return false;
            }
        } catch (Exception e) {
            log.error("Error occurred while deleting campaign with id: {}", id, e);
            return false;
        }
    }

    public CampaignInfoModel findById(Long id) {
        return campaignInfoRepository.findById(id).orElse(null);
    }
}
