package com.example.springboot_cms.services;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RateLimiterService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final String RATE_LIMIT_KEY = "rateLimit";
    private static final int RATE_LIMIT = 100; // Max 100 emails per minute

    public boolean isRateLimited(String user) {
        Long count = redisTemplate.opsForValue().increment(RATE_LIMIT_KEY + ":" + user);
        if (count == 1) {
            redisTemplate.expire(RATE_LIMIT_KEY + ":" + user, 1, TimeUnit.MINUTES);
        }
        return count > RATE_LIMIT;
    }
}
