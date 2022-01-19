-- public.post_category definition

-- Drop table

-- DROP TABLE public.post_category;

CREATE TABLE public.post_category (
	post_id int8 NULL,
	category_id int8 NULL
);


-- public.post_category foreign keys

ALTER TABLE public.post_category ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public.category_list(category_id);
ALTER TABLE public.post_category ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.post(post_id);