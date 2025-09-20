package com.UltimateGaming.GameoN.security;

import com.UltimateGaming.GameoN.model.AdminUser;
import com.UltimateGaming.GameoN.repository.AdminUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminAuthInterceptor implements HandlerInterceptor {

    private final AdminUserRepository adminUserRepository;

    @Autowired
    public AdminAuthInterceptor(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getRequestURI();

        // Allow register and login requests without token
        if (path.equals("/admin/register") || path.equals("/admin/login")) {
            return true;
        }

        String adminToken = request.getHeader("X-ADMIN-TOKEN");

        if (adminToken == null || adminToken.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Admin token required");
            return false;
        }

        // Check if token matches any admin user in database
        AdminUser adminUser = adminUserRepository.findByPassword(adminToken); // Using password as token for simplicity
        if (adminUser == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid admin token");
            return false;
        }

        // Token valid, allow request
        return true;
    }
}
