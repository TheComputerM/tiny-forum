-- PostgreSQL Schema

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
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
  "duplicate_id" integer DEFAULT NULL,
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


INSERT INTO users (name, email, is_moderator) VALUES ('Admin', 'admin@tiny-forum.com', true);

INSERT INTO tag (name, description) VALUES ('newbie', 'A newly joined member');

CREATE OR REPLACE PROCEDURE delete_by_tag(tag IN INTEGER) AS $$
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
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE get_recent_posts() AS $$
-- This procedure returns a cursor to a view containing recent posts
DECLARE
	current_timestamp TIMESTAMP;
BEGIN
	SELECT systimestamp INTO current_timestamp FROM dual;
	SELECT id FROM post WHERE id IN (
		SELECT post_id FROM comment WHERE created_at >= current_timestamp - INTERVAL '24' HOUR
	);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION assign_newbie_tag()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_moderator = false THEN
        INSERT INTO user_tags (user_id, tag_id)
        VALUES (NEW.id, 1);
    END IF;
		RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER newbie_tag_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION assign_newbie_tag();

CREATE FUNCTION welcome_post()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO post (user_id,title,content)
	VALUES (NEW.id,'Welcome User','Welcome to our platform, '||NEW.name||'!');

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER welcome_post_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION welcome_post();

CREATE FUNCTION self_like()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO sentiment (user_id,comment_id,score)
    VALUES (NEW.user_id,NEW.id,1);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER self_like_trigger
AFTER INSERT ON comment
FOR EACH ROW
EXECUTE FUNCTION self_like();

