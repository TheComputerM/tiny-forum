import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const postId = parseInt(event.params.post_id);
  /**
   * TODO(eshaan): also get the user's name in the post
   * ```json
   * {
   *    id: <<post_id>>,
   *    ...,
   * }
   * ```
   */
  const post = await sql`select 
  post.*, users.name as user, ARRAY_AGG(tag.name) AS tags
  from post 
  INNER JOIN users ON users.id = post.user_id
  LEFT JOIN post_tags on post_tags.post_id = post.id
  LEFT JOIN tag on tag.id = post_tags.tag_id
  where post.id = ${postId}
  GROUP BY post.id, users.id`;

  return post[0];
}
