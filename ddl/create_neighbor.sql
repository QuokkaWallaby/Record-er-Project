-- public.neighbor definition

-- Drop table

-- DROP TABLE public.neighbor;

CREATE TABLE public.neighbor (
	from_user int8 NOT NULL,
	to_user int8 NOT NULL
);


-- public.neighbor foreign keys

ALTER TABLE public.neighbor ADD CONSTRAINT from_user FOREIGN KEY (from_user) REFERENCES public."user"(user_id);
ALTER TABLE public.neighbor ADD CONSTRAINT to_user FOREIGN KEY (to_user) REFERENCES public."user"(user_id);