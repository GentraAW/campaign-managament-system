package com.example.springboot_cms.controller;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        CustomerModel customer = customerService.findById(id);
        if (customer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id : " + id + " tidak ditemukan");
        }
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    public ResponseEntity<CustomerModel> createCustomer(@RequestBody CustomerModel customer) {
        try{
            CustomerModel createCustomer = customerService.save(customer);
            return ResponseEntity.status(HttpStatus.CREATED).body(createCustomer);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody CustomerModel customer) {
        Optional<CustomerModel> customers = customerService.update(id, customer);
        try{
            if(customers.isPresent()){
                return ResponseEntity.ok(customers.get());
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id : " + id + "Tidak tersedia");
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
       boolean deleted = customerService.delete(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id : " + id + " tidak ditemukan");
        }
        return ResponseEntity.ok("Berhasil dihapus " + id);
    }
}
