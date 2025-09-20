package com.UltimateGaming.GameoN.service;

import com.UltimateGaming.GameoN.dto.MemberDto;
import com.UltimateGaming.GameoN.model.Member;
import com.UltimateGaming.GameoN.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // initialize password encoder
    }

    // Create a new member with hashed password
    public Member createMember(MemberDto memberDto) {
        logger.info("Received request to create a new member: {}", memberDto.getName());

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(memberDto.getPassword());

        Member member = new Member();
        member.setUsername(memberDto.getUsername());
        member.setName(memberDto.getName());
        member.setPhone(memberDto.getPhone());
        member.setEmail(memberDto.getEmail());
        member.setPassword(hashedPassword);
        member.setBalance(130.0); // initial deposit
        member.setActive(true);

        Member savedMember = memberRepository.save(member);
        logger.info("Successfully created and saved a new member with ID: {}", savedMember.getId());

        return savedMember;
    }

    // Validate login credentials
    public boolean validateLogin(String username, String rawPassword) {
        return memberRepository.findByUsername(username)
                .map(member -> passwordEncoder.matches(rawPassword, member.getPassword()))
                .orElse(false);
    }

    // Get member by username (used to check duplicates)
    public Member getByUsername(String username) {
        return memberRepository.findByUsername(username).orElse(null);
    }
}
 