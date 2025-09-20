package com.UltimateGaming.GameoN.controller;

import com.UltimateGaming.GameoN.model.AdminUser;
import com.UltimateGaming.GameoN.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin") // base path for admin authentication
public class AdminUserController {

    private final AdminUserService adminUserService;

    @Autowired
    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    // ----------------- Register -----------------
    @PostMapping("/register")
    public ResponseEntity<AdminUser> register(@RequestBody AdminUser user) {
        return ResponseEntity.ok(adminUserService.createAdmin(user));
    }

    // ----------------- Login -----------------
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminUser user) {
        Optional<AdminUser> auth = adminUserService.authenticate(user.getUsername(), user.getPassword());
        if (auth.isPresent()) {
            // For now, we'll use the password as token just to test
            return ResponseEntity.ok("Login successful! Use your password as X-ADMIN-TOKEN header.");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
