-- public.post_tag definition

-- Drop table

-- DROP TABLE public.post_tag;

CREATE TABLE public.post_tag (
	post_id int8 NOT NULL,
	tag_id int8 NOT NULL
);


-- public.post_tag foreign keys

ALTER TABLE public.post_tag ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.post(post_id);
ALTER TABLE public.post_tag ADD CONSTRAINT tag_id FOREIGN KEY (tag_id) REFERENCES public.tag_list(tag_id);