import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";
import { getSession } from "~/lib/session";

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
  const comments = await sql`select * from comment where post_id = ${postId}`;
  return comments;
}

export async function POST(event: APIEvent) {
  const postId = event.params.post_id as string;
  const session = await getSession();
  console.log(session);
  
}