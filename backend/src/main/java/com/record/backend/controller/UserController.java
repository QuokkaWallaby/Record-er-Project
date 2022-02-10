package com.record.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.record.backend.domain.user.User;
import com.record.backend.repository.UserRepository;

@RestController
@RequestMapping("api/")
public class UserController {

	@Autowired private UserRepository userRepository;

	@GetMapping("users")
	public List<User> findAllUsers() {
		return this.userRepository.findAll();
	}
}
