package com.UltimateGaming.GameoN.controller;

import com.UltimateGaming.GameoN.dto.MemberDto;
import com.UltimateGaming.GameoN.exception.MemberNotFoundException;
import com.UltimateGaming.GameoN.model.Member;
import com.UltimateGaming.GameoN.repository.MemberRepository;
import com.UltimateGaming.GameoN.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberService memberService;

    @GetMapping
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @PostMapping
    public Member addMember(@Valid @RequestBody MemberDto memberDto) {
        return memberService.createMember(memberDto);
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable String id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(id));
    }

    @DeleteMapping
    public String deleteAllMembers() {
        memberRepository.deleteAll();
        return "All members have been deleted successfully.";
    }

    // 🔍 Search members by name
    @GetMapping("/search/name/{name}")
    public List<Member> searchMembersByName(@PathVariable String name) {
        return memberRepository.findByNameContainingIgnoreCase(name);
    }

    // 🔍 Search member by phone
    @GetMapping("/search/phone/{phone}")
    public ResponseEntity<Member> searchMemberByPhone(@PathVariable String phone) {
        return memberRepository.findByPhone(phone)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
