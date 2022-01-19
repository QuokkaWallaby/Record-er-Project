-- public.post_like definition

-- Drop table

-- DROP TABLE public.post_like;

CREATE TABLE public.post_like (
	post_id int8 NOT NULL,
	user_id int8 NOT NULL,
	CONSTRAINT post_like_pkey PRIMARY KEY (post_id, user_id)
);


-- public.post_like foreign keys

ALTER TABLE public.post_like ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.post(post_id);
ALTER TABLE public.post_like ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);