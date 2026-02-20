package com.education.feature.auth.dto;

import com.education.feature.auth.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserInfoResponse {

    private Integer          userId;
    private String        fullName;
    private String        email;
    private String        role;
    private String        avatarUrl;
    private boolean       isActive;
    private LocalDateTime createdAt;

    public static UserInfoResponse from(User user) {
        return UserInfoResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .avatarUrl(user.getAvatarUrl())
                .isActive(Boolean.TRUE.equals(user.getIsActive()))
                .createdAt(user.getCreatedAt())
                .build();
    }
}
