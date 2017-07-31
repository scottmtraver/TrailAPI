BEGIN;

CREATE TABLE IF NOT EXISTS public.campaigns (
	id character varying(38) NOT NULL,
	"type" character varying(255),
	meta character varying(255),
	"name" character varying(255),
	video_url character varying(2000),
	is_active boolean DEFAULT true,
	PRIMARY KEY(id)
);

COMMIT;

