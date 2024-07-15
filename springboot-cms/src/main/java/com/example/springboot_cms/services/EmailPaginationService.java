package com.example.springboot_cms.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class EmailPaginationService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final String EMAIL_PAGINATION_KEY = "emailPagination";

    public void addEmail(String email) {
        redisTemplate.opsForList().rightPush(EMAIL_PAGINATION_KEY, email);
    }

    public List<String> getEmails(int page, int size) {
        int start = (page - 1) * size;
        int end = start + size - 1;
        return redisTemplate.opsForList().range(EMAIL_PAGINATION_KEY, start, end);
    }
}
