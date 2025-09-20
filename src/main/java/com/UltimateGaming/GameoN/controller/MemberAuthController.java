package com.UltimateGaming.GameoN.controller;

import com.UltimateGaming.GameoN.dto.MemberDto;
import com.UltimateGaming.GameoN.model.Member;
import com.UltimateGaming.GameoN.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class MemberAuthController {

    private final MemberService memberService;

    @Autowired
    public MemberAuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    // ------------------ Register ------------------
    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody MemberDto memberDto) {
        if (memberService.getByUsername(memberDto.getUsername()) != null) {
            return ResponseEntity.status(400).body("Username already exists");
        }

        Member savedMember = memberService.createMember(memberDto);
        return ResponseEntity.ok(savedMember);
    }

    // ------------------ Login ------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDto memberDto) {
        boolean valid = memberService.validateLogin(memberDto.getUsername(), memberDto.getPassword());

        if (valid) {
            Member member = memberService.getByUsername(memberDto.getUsername());
            return ResponseEntity.ok(Map.of(
                "message", "Login successful!",
                "token", memberDto.getPassword(),
                "user", member
            ));
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
