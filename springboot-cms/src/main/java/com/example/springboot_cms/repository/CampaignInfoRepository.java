package com.example.springboot_cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springboot_cms.model.CampaignInfoModel;

@Repository
public interface CampaignInfoRepository  extends JpaRepository<CampaignInfoModel, Long>{
    
}
