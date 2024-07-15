package com.example.springboot_cms.model;

import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "email_mass_log", schema = "public")
public class EmailMassLogModel  implements Serializable{
    @Id
    @Column(name = "email_mass_log_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long emailMassLogId;

    @Column(name = "email")
    private String email;

    @Column(name = "message")
    private String message;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerModel customer;

    @ManyToOne
    @JoinColumn(name = "campaign_info_id")
    private CampaignInfoModel campaign;

    @Column(name = "date", unique = true)
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
}
