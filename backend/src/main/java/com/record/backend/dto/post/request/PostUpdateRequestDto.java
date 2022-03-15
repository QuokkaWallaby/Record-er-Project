package com.record.backend.dto.post.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.record.backend.domain.category.Category;
import com.record.backend.domain.post.Exposure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostUpdateRequestDto {

	@NotEmpty
	@Size(min = 1, max = 20)
	private String title;
	@NotEmpty
	@Size(min = 1)
	private String content;
	private Exposure exposure;
	private String thumbnailImage;
	private Category category;
}
