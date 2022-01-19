-- public.comment_like definition

-- Drop table

-- DROP TABLE public.comment_like;

CREATE TABLE public.comment_like (
	comment_id int8 NOT NULL,
	user_id int8 NOT NULL
);


-- public.comment_like foreign keys

ALTER TABLE public.comment_like ADD CONSTRAINT comment_id FOREIGN KEY (comment_id) REFERENCES public."comment"(comment_id);
ALTER TABLE public.comment_like ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);