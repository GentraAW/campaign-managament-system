package com.example.springboot_cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot_cms.model.CustomerModel;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerModel, Long> {
    CustomerModel findByEmail(String email);
}

