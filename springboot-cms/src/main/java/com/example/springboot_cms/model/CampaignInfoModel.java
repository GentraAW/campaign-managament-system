package com.example.springboot_cms.model;

import lombok.*;

import java.io.Serializable;

import jakarta.persistence.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "campaign_info", schema = "public")
public class CampaignInfoModel implements Serializable {
    @Id
    @Column(name = "campaign_info_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long campaignInfoId;

    @Column(name = "name")
    private String name;

    @Column(name = "description", unique = true)
    private String description;

    @Column(name= "target_audience")
    private Long targetAudience;
}