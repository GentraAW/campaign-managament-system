package com.example.springboot_cms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot_cms.model.CustomerModel;
import com.example.springboot_cms.services.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<CustomerModel> getAllCustomers() {
        return customerService.findAll();
    }

    @PostMapping
    public CustomerModel createCustomer(@RequestBody CustomerModel customer) {
        return customerService.save(customer);
    }

    @PutMapping("/{id}")
    public CustomerModel updateCustomer(@PathVariable Long id, @RequestBody CustomerModel customer) {
        return customerService.update(id, customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.delete(id);
    }
}
