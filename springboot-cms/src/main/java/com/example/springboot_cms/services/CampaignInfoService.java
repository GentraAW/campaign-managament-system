package com.example.springboot_cms.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.springboot_cms.model.CampaignInfoModel;
import com.example.springboot_cms.repository.CampaignInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampaignInfoService {

    private final CampaignInfoRepository campaignInfoRepository;

    public List<CampaignInfoModel> findAll() {
        return campaignInfoRepository.findAll();
    }

    public CampaignInfoModel save(CampaignInfoModel campaignInfo) {
        return campaignInfoRepository.save(campaignInfo);
    }

    public CampaignInfoModel update(Long id, CampaignInfoModel updatedCampaignInfo) throws Exception {
        Optional<CampaignInfoModel> campaign = campaignInfoRepository.findById(id);
        if(campaign.isPresent()){
            CampaignInfoModel existingCampaign = campaign.get();
            if(updatedCampaignInfo.getName() != null){
                existingCampaign.setName(updatedCampaignInfo.getName());
            }
            if(updatedCampaignInfo.getDescription() != null){
                existingCampaign.setDescription(updatedCampaignInfo.getDescription());
            }
            if(updatedCampaignInfo.getTargetAudience() != null){
                existingCampaign.setTargetAudience(updatedCampaignInfo.getTargetAudience());
            }

        return campaignInfoRepository.save(existingCampaign);

        }else{
            return null;
        }
        
    }

    public void delete(Long id) {
        campaignInfoRepository.deleteById(id);
    }

    public CampaignInfoModel findById(Long id) {
        return campaignInfoRepository.findById(id).orElseThrow();
    }
}
