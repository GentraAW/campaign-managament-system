package com.example.springboot_cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot_cms.model.CampaignInfoModel;

public interface CampaignInfoRepository  extends JpaRepository<CampaignInfoModel, Long>{
    
}
