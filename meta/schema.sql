-- PostgreSQL Schema

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(100) NOT NULL,
	"is_moderator" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255)
);

CREATE TABLE IF NOT EXISTS "user_tags" (
	"user_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "user_tag_pk" PRIMARY KEY("user_id","tag_id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  FOREIGN KEY ("tag_id") REFERENCES "tag"("id")
);

CREATE TABLE IF NOT EXISTS "post" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
  "duplicate_id" integer,
	"created_at" timestamp DEFAULT now(),
  FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  FOREIGN KEY ("duplicate_id") REFERENCES "post"("id")
);


CREATE TABLE IF NOT EXISTS "post_tags" (
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "post_tag_pk" PRIMARY KEY("post_id","tag_id"),
  FOREIGN KEY ("post_id") REFERENCES "post"("id"),
  FOREIGN KEY ("tag_id") REFERENCES "tag"("id")
);

CREATE TABLE IF NOT EXISTS "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"parent_id" integer,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
  FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  FOREIGN KEY ("post_id") REFERENCES "post"("id"),
  FOREIGN KEY ("parent_id") REFERENCES "comment"("id")
);

CREATE TABLE IF NOT EXISTS "sentiment" (
	"user_id" integer NOT NULL,
	"comment_id" integer NOT NULL,
  "score" integer NOT NULL,
	CONSTRAINT "user_comment_pk" PRIMARY KEY("user_id","comment_id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  FOREIGN KEY ("comment_id") REFERENCES "comment"("id")
);
