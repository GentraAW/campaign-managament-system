package com.example.springboot_cms.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class EmailStatusService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void updateEmailStatus(String email, String status) {
        redisTemplate.opsForHash().put("emailStatus", email, status);
    }

    public String getEmailStatus(String email) {
        return (String) redisTemplate.opsForHash().get("emailStatus", email);
    }
}
