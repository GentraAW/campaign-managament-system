package com.example.springboot_cms.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.springboot_cms.model.CustomerModel;
import com.example.springboot_cms.repository.CustomerRepository;
import com.example.springboot_cms.repository.EmailMassLogRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    private final EmailMassLogRepository emailMassLogRepository;

    public List<CustomerModel> findAll() {
        return customerRepository.findAll();
    }

    public CustomerModel findById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public CustomerModel save(CustomerModel customer) {
        return customerRepository.save(customer);
    }

    public Optional<CustomerModel> update(Long id, CustomerModel updatedCustomer) {
        Optional<CustomerModel> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            CustomerModel existingCustomer = customer.get();
            if (updatedCustomer.getCompanyName() != null) {
                existingCustomer.setCompanyName(updatedCustomer.getCompanyName());
            }
            if (updatedCustomer.getEmail() != null) {
                existingCustomer.setEmail(updatedCustomer.getEmail());
            }
            if(updatedCustomer.getCode() != null){
                existingCustomer.setCode(updatedCustomer.getCode());
            }
            if(updatedCustomer.getAlamatKantor() != null){
                existingCustomer.setAlamatKantor(updatedCustomer.getAlamatKantor());
            }
            if(updatedCustomer.getTelephone() != null){
                existingCustomer.setTelephone(updatedCustomer.getTelephone());
            }
            if(updatedCustomer.getFax() != null){
                existingCustomer.setFax(updatedCustomer.getFax());
            }
            if(updatedCustomer.getNpwp() != null){
                existingCustomer.setNpwp(updatedCustomer.getNpwp());
            }
            if(updatedCustomer.getSitus() != null){
                existingCustomer.setSitus(updatedCustomer.getSitus());
            }
            if(updatedCustomer.getBidangUsaha() != null){
                existingCustomer.setBidangUsaha(updatedCustomer.getBidangUsaha());
            }
            if(updatedCustomer.getSektor() != null){
                existingCustomer.setSektor(updatedCustomer.getSektor());
            }
            if(updatedCustomer.getIndustri() != null){
                existingCustomer.setIndustri(updatedCustomer.getIndustri());
            }
            return Optional.of(customerRepository.save(existingCustomer));
        } else {
            return Optional.empty();
        }
    }

    @Transactional
    public boolean delete(Long id) {
        try {
            Optional<CustomerModel> customer = customerRepository.findById(id);
            if (!customer.isPresent()) {
                return false;
            }

            emailMassLogRepository.deleteByCustomer_CustomerId(id);
            customerRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
}
