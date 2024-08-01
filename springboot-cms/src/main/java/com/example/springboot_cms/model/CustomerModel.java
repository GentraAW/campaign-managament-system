package com.example.springboot_cms.model;

import lombok.*;
import java.io.Serializable;
import jakarta.persistence.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer", schema = "public")
public class CustomerModel implements Serializable {
    @Id
    @Column(name = "customer_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long customerId;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "code")
    private String code;

    @Column(name = "alamat_kantor")
    private String alamatKantor;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "fax")
    private String fax;

    @Column(name = "npwp")
    private String npwp;

    @Column(name = "situs")
    private String situs;

    @Column(name= "bidang_usaha")
    private String bidangUsaha;

    @Column(name= "sektor")
    private String sektor;

    @Column(name= "industri")
    private String industri;

    @Column(name = "email", unique = true)
    private String email;
}
