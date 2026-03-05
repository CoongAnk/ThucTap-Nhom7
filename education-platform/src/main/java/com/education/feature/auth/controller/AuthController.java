package com.education.feature.auth.controller;

import com.education.common.response.ApiResponse;
import com.education.feature.auth.dto.*;
import com.education.feature.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Auth Controller
 * Base URL: /api/v1/auth
 *
 * POST /register      → Đăng ký tài khoản
 * POST /login         → Đăng nhập
 * GET  /me            → Lấy thông tin user đang đăng nhập
 * PUT  /change-password → Đổi mật khẩu
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    /**
     * Đăng ký tài khoản học viên mới.
     *
     * Request body:
     * {
     *   "fullName": "Nguyễn Văn A",
     *   "email": "a@gmail.com",
     *   "password": "123456"
     * }
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse data = authService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đăng ký thành công! Chào mừng bạn đến EduPlatform 🎉", data));
    }


    /**
     * Đăng nhập và nhận JWT token.
     *
     * Request body:
     * {
     *   "email": "a@gmail.com",
     *   "password": "123456"
     * }
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse data = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", data));
    }

    // ─── GET /me ─────────────────────────────────────────────────────────

    /**
     * Lấy thông tin profile của người dùng đang đăng nhập.
     * Header: Authorization: Bearer <token>
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserInfoResponse>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {

        UserInfoResponse data = authService.getProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    // ─── PUT /change-password ─────────────────────────────────────────────

    /**
     * Đổi mật khẩu.
     * Header: Authorization: Bearer <token>
     *
     * Request body:
     * {
     *   "oldPassword": "matkhaucu",
     *   "newPassword": "matkhaumoi123"
     * }
     */
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ChangePasswordRequest request) {

        authService.changePassword(
                userDetails.getUsername(),
                request.getOldPassword(),
                request.getNewPassword()
        );
        return ResponseEntity.ok(ApiResponse.success("Đổi mật khẩu thành công", null));
    }
}
