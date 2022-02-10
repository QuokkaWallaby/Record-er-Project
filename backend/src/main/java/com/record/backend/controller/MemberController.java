package com.record.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.record.backend.Member;
import com.record.backend.repository.MemberRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/")
public class MemberController {

	@Autowired
	MemberRepository memberRepository;

	@GetMapping("/members")
	public List<Member> findAllMembers() {
		return this.memberRepository.findAll();
	}
}
