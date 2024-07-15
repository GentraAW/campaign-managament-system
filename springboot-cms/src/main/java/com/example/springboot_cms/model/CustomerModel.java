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

    @Column(name = "name")
    private String name;

    @Column(name = "email", unique = true)
    private String email;
}
