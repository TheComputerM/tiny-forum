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
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("tag_id") REFERENCES "tag"("id")
);

CREATE TABLE IF NOT EXISTS "post" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
  "duplicate_id" integer,
	"created_at" timestamp DEFAULT now(),
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("duplicate_id") REFERENCES "post"("id")
);


CREATE TABLE IF NOT EXISTS "post_tags" (
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "post_tag_pk" PRIMARY KEY("post_id","tag_id"),
  FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE,
  FOREIGN KEY ("tag_id") REFERENCES "tag"("id")
);

CREATE TABLE IF NOT EXISTS "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"parent_id" integer,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE,
  FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "sentiment" (
	"user_id" integer NOT NULL,
	"comment_id" integer NOT NULL,
  "score" integer NOT NULL,
	CONSTRAINT "user_comment_pk" PRIMARY KEY("user_id","comment_id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE CASCADE
);

CREATE OR REPLACE PROCEDURE delete_by_tag(tag IN SERIAL) IS
-- This procedure deletes all posts and users with a certain tag
BEGIN
	DELETE FROM users WHERE id IN (
		SELECT user_id FROM user_tags WHERE tag_id=tag
	);
	DELETE FROM post WHERE id IN (
		SELECT post_id FROM post_tags WHERE tag_id=tag
	);
	DELETE FROM tag WHERE id=tag;
END;

CREATE OR REPLACE PROCEDURE get_recent_posts() RETURN SYS_REFCURSOR IS
-- This procedure returns a cursor to a view containing recent posts
DECLARE
	result SYS_REFCURSOR;
	current_timestamp TIMESTAMP;
BEGIN
	SELECT systimestamp INTO current_timestamp FROM dual;
	OPEN result FOR
		SELECT id FROM post WHERE id IN (
			SELECT post_id FROM comment WHERE created_at >= current_timestamp - INTERVAL '24' HOUR
		);
	RETURN result;
END;

CREATE FUNCTION welcome_post()
RETURN TRIGGER AS $$
BEGIN
	INSERT INTO post (user_id,title,content)
	VALUES(NEW.id,'Welcome User','Welcome to our platform, '||NEW.name||'!');

	RETURN NEW;
END;
$$ LANGUAGE plpgsql

CREATE TRIGGER welcome_post_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION welcome_post();