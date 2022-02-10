package com.record.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.record.backend.domain.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
