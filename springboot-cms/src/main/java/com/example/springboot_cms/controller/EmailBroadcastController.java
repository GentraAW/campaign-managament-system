package com.example.springboot_cms.controller;

import com.example.springboot_cms.services.EmailService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email-broadcast")
public class EmailBroadcastController {

    @Autowired
    private EmailService emailService;

    private HashOperations<String, String, String> hashOperations;

    @Autowired
    public EmailBroadcastController(RedisTemplate<String, String> redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }
    
    @GetMapping("/emailStatus")
    public ResponseEntity<?> getEmailStatus() {
        try {
            Map<String, String> emailStatus = hashOperations.entries("emailStatus");
            List<Map<String, String>> responseList = emailStatus.entrySet().stream()
                .map(entry -> {
                    Map<String, String> item = new HashMap<>();
                    item.put("email", entry.getKey());
                    item.put("status", entry.getValue());
                    return item;
                })
                .collect(Collectors.toList());
            return new ResponseEntity<>(responseList, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Terjadi kesalahan saat mengambil status email");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/send/{id}")
    public ResponseEntity<String> sendBroadcastEmail(@PathVariable Long id) {
        try {
            emailService.sendBroadcastEmail(id);
            emailService.processEmailQueue();
            return ResponseEntity.ok("Email broadcast telah dikirim.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Terjadi kesalahan: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-entries")
    public ResponseEntity<String> deleteEntries() {
        try {
            emailService.deleteAllEmailStatusEntries();
            return ResponseEntity.ok("Semua entri email telah dihapus.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Terjadi kesalahan: " + e.getMessage());
        }
    }

    
}
