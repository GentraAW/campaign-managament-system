package com.example.springboot_cms.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springboot_cms.model.EmailMassLogModel;

@Repository
public interface EmailMassLogRepository extends JpaRepository<EmailMassLogModel, Long> {
     void deleteByCustomer_CustomerId(Long customerId);
     void deleteByCampaign_CampaignInfoId(Long campaignId);
}

