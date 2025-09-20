package com.UltimateGaming.GameoN.repository;

import com.UltimateGaming.GameoN.model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends MongoRepository<Member, String> {

    // Find by unique username
    Optional<Member> findByUsername(String username);

    // Find by unique email
    Optional<Member> findByEmail(String email);

    // Search by name (case-insensitive, contains)
    List<Member> findByNameContainingIgnoreCase(String name);

    // Search by phone (exact match)
    Optional<Member> findByPhone(String phone);
}
