package com.education.feature.auth.service;

import com.education.common.exception.AppException;
import com.education.feature.auth.dto.*;
import com.education.feature.auth.entity.User;
import com.education.feature.auth.repository.UserRepository;
import com.education.feature.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository        userRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtService            jwtService;
    private final AuthenticationManager authManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Kiểm tra email đã tồn tại chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(409, "Email '" + request.getEmail() + "' đã được sử dụng");
        }

        if (request.getBirthDay() != null) {
            int age = LocalDate.now().getYear() - request.getBirthDay().getYear();
            if (request.getBirthDay().plusYears(age).isAfter(LocalDate.now())) age--;
            if (age < 6) {
                throw new AppException(400, "Bạn phải ít nhất 6 tuổi để đăng ký");
            }
        }

        // Tạo entity User
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail().toLowerCase().trim())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .birthDay(request.getBirthDay())
                .role(User.Role.student)
                .isActive(true)
                .build();

        userRepository.save(user);
        log.info("New user registered: {} ({})", user.getEmail(), user.getUserId());

        // Phát sinh JWT ngay sau khi đăng ký
        String token = jwtService.generateToken(user);
        return AuthResponse.of(token, toSeconds(jwtService.getExpirationMs()), user);
    }

    public AuthResponse login(LoginRequest request) {
        // AuthenticationManager sẽ throw BadCredentialsException nếu sai
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().toLowerCase().trim(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new AppException(404, "Không tìm thấy người dùng"));

        if (!user.getIsActive()) {
            throw new AppException(403, "Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên");
        }

        log.info("User logged in: {}", user.getEmail());
        String token = jwtService.generateToken(user);
        return AuthResponse.of(token, toSeconds(jwtService.getExpirationMs()), user);
    }

    @Transactional(readOnly = true)
    public UserInfoResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(404, "Không tìm thấy người dùng"));
        return UserInfoResponse.from(user);
    }

    @Transactional
    public void changePassword(String email,
                               String oldPassword,
                               String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(404, "Không tìm thấy người dùng"));

        if (!passwordEncoder.matches(oldPassword, user.getPasswordHash())) {
            throw new AppException(400, "Mật khẩu cũ không chính xác");
        }

        if (newPassword.length() < 6) {
            throw new AppException(400, "Mật khẩu mới phải có ít nhất 6 ký tự");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        log.info("Password changed for user: {}", email);
    }

    private long toSeconds(long milliseconds) {
        return TimeUnit.MILLISECONDS.toSeconds(milliseconds);
    }
}
