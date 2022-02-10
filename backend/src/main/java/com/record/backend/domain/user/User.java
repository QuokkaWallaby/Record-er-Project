package com.record.backend.domain.user;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.record.backend.domain.category.Category;
import com.record.backend.domain.comment.Comment;
import com.record.backend.domain.comment.CommentLike;
import com.record.backend.domain.post.Post;
import com.record.backend.domain.post.PostLike;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class User {

	@Id @GeneratedValue
	@Column(name = "user_id")
	private Long id;

	private String email;

	private String password;

	private String nickname;

	private String domain;

	private byte[] profile_photo;

	private String introduce;

	private LocalDateTime created_time;

	//1대 다 관계
	@OneToMany(mappedBy = "user")
	private List<Post> postList = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Category> categoryList = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Comment> commentList = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<CommentLike> commentLikeList = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<PostLike> postLikeList = new ArrayList<>();

}
