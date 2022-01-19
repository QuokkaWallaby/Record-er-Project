-- public.category_list definition

-- Drop table

-- DROP TABLE public.category_list;

CREATE TABLE public.category_list (
	category_id int8 NOT NULL DEFAULT nextval('category_category_id_seq'::regclass),
	user_id int8 NOT NULL,
	category_name varchar(20) NOT NULL,
	parent_category int8 NULL,
	CONSTRAINT category_pkey PRIMARY KEY (category_id)
);


-- public.category_list foreign keys

ALTER TABLE public.category_list ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);