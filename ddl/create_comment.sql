-- public."comment" definition

-- Drop table

-- DROP TABLE public."comment";

CREATE TABLE public."comment" (
	comment_id bigserial NOT NULL,
	user_id int8 NOT NULL,
	post_id int8 NOT NULL,
	"content" varchar(200) NOT NULL,
	parent_commnet int8 NULL,
	create_time timestamptz NOT NULL,
	CONSTRAINT comment_pkey PRIMARY KEY (comment_id)
);


-- public."comment" foreign keys

ALTER TABLE public."comment" ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.post(post_id);
ALTER TABLE public."comment" ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);