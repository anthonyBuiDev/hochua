CREATE TABLE IF NOT EXISTS "parameters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "parameters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tt" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"unit" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL
);
