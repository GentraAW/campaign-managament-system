package com.example.springboot_cms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.springboot_cms.services.EmailMassLogService;

import java.util.Map;

@RestController
@RequestMapping("/emails")
public class EmailQueueController {

    @Autowired
    private EmailMassLogService emailMassLogService;

    @PostMapping("/queue")
    public String addEmailToQueue(@RequestBody Map<String, String> emailRequest) {
        String email = emailRequest.get("email");
        String message = emailRequest.get("message");
        emailMassLogService.addEmailToQueue(email, message);
        return "Email added to queue";
    }

    @GetMapping("/queue/next")
    public Map<String, String> getNextEmailFromQueue() {
        Map<String, String> emailData = emailMassLogService.getNextEmailFromQueue();
        if (emailData != null) {
            emailMassLogService.logEmail(emailData.get("email"), emailData.get("message"));
        }
        return emailData != null ? emailData : Map.of("message", "Queue is empty");
    }

    @PostMapping("/send")
    public String sendEmails() {
        emailMassLogService.processEmailQueue();
        return "Email sending process started";
    }
}
