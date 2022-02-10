package com.record.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.record.backend.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
