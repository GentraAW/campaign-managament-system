package com.example.springboot_cms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot_cms.model.EmailMassLogModel;
import com.example.springboot_cms.repository.EmailMassLogRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/email-mass-logs")
@RequiredArgsConstructor
public class EmailMassLogController {

    private final EmailMassLogRepository emailMassLogRepository;

    @GetMapping
    public List<EmailMassLogModel> getAllLogs() {
        return emailMassLogRepository.findAll();
    }
}
