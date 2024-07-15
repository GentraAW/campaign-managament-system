package com.example.springboot_cms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot_cms.services.MassEmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mass-email")
@RequiredArgsConstructor
public class MassEmailController {

    private final MassEmailService massEmailService;

    // @PostMapping("/send/{campaignId}")
    // public ResponseEntity<String> sendMassEmail(@PathVariable Long campaignId) {
    //     massEmailService.sendMassEmails(campaignId);
    //     return ResponseEntity.ok("Mass email process started");
    // }

    @PostMapping
    public ResponseEntity<String> startMassEmailProcess(@RequestParam Long campaignId) {
        massEmailService.startMassEmailProcess(campaignId);
        return ResponseEntity.ok("Mass email process started");
    }

    
}
