package com.exam.onlineexam.dto;

public class LoginResponse {

    private Long userId;
    private String name;

    public LoginResponse(Long userId, String name) {
        this.userId = userId;
        this.name = name;

    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

}
