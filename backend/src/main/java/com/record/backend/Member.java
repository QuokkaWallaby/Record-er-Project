package com.record.backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Member {

	@Id @GeneratedValue
	private Long id;
	private String username;
	private String email;

	public Member() {
	}

	public Member(String username, String email) {
		this.username = username;
		this.email = email;
	}
}
