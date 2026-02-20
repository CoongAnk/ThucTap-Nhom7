package com.education.feature.auth.dto;

import com.education.feature.auth.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {

    private String      accessToken;
    private String      tokenType;
    private long        expiresIn;
    private UserProfile user;

    @Data
    @Builder
    public static class UserProfile {
        private Integer     userId;
        private String      fullName;
        private String      email;
        private String      role;
        private String      avatarUrl;
    }

    public static AuthResponse of(String token, long expiresIn, User user) {
        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .user(UserProfile.builder()
                        .userId(user.getUserId())
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .avatarUrl(user.getAvatarUrl())
                        .build())
                .build();
    }
}
