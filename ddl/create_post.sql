-- public.post definition

-- Drop table

-- DROP TABLE public.post;

CREATE TABLE public.post (
	post_id int4 NOT NULL DEFAULT nextval('"Post_post_id_seq"'::regclass),
	user_id int4 NOT NULL DEFAULT nextval('"Post_user_id_seq"'::regclass),
	contents_url varchar NOT NULL,
	summary varchar NULL,
	exposure varchar NOT NULL,
	thumbnail_url varchar NULL,
	created_time timestamptz NOT NULL,
	CONSTRAINT "Post_pkey" PRIMARY KEY (post_id)
);


-- public.post foreign keys

ALTER TABLE public.post ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);