package com.example.springboot_cms.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.springboot_cms.model.CustomerModel;
import com.example.springboot_cms.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<CustomerModel> findAll() {
        return customerRepository.findAll();
    }

    public CustomerModel save(CustomerModel customer) {
        return customerRepository.save(customer);
    }

    public CustomerModel update(Long id, CustomerModel customer) {
        CustomerModel existingCustomer = customerRepository.findById(id).orElseThrow();
        existingCustomer.setName(customer.getName());
        existingCustomer.setEmail(customer.getEmail());
        return customerRepository.save(existingCustomer);
    }

    public void delete(Long id) {
        customerRepository.deleteById(id);
    }
    
}
