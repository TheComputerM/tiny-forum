import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const postId = event.params.post_id as string;

  /**
   * todo(saitej): get number of likes and dislikes in each comment using the sentiment table, also the user who has posted them
   * ```json
   * [{
   *    id: <<comment_id>>,
   *    likes: <<number>>,
   *    dislikes: <<number>>,
   *    user: {
   *      id: <<user_id>>
   *    }
   * }, ...]
   * ```
   */
  // const user_id = await sql`select user_id from post where id = ${postId}`;
  // const sentiment = await sql`select score from sentiment where user_id = ${user_id}`;
  const comments = await sql`select * from comment where post_id = ${postId}`;
  const comment = await sql`select comment.id ,SUM(sentiment.score) as score,comment.user_id from comment left join sentiment on comment.id = sentiment.comment_id where comment.post_id = ${postId} group by comment.id`
  return comment;
}

export async function POST(event: APIEvent) {
  const postId = event.params.post_id as string;
  
}