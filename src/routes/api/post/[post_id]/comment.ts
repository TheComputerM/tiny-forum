import { reload } from "@solidjs/router";
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
   *    score: <<sum of likes and dislikes>>,
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
  const userId = session.data.id;
  const { searchParams } = new URL(event.request.url);
  const parentCommentId = searchParams.get("parent")
    ? parseInt(searchParams.get("parent") as string)
    : null;
  console.log(event.request.url);
  console.log(searchParams.get("parent"));
  const formdata = await event.request.formData();
  const content = formdata.get("content")!.toString();

  await sql`insert into comment (user_id, post_id, parent_id, content) values (${userId}, ${postId}, ${parentCommentId}, ${content})`;
  
  return reload();
}
