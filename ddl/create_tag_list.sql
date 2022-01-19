-- public.tag_list definition

-- Drop table

-- DROP TABLE public.tag_list;

CREATE TABLE public.tag_list (
	tag_id int8 NOT NULL DEFAULT nextval('tag_list_id_seq'::regclass),
	tag_name varchar(10) NOT NULL,
	CONSTRAINT tag_list_pkey PRIMARY KEY (tag_id)
);