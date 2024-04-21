import { reload } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";
import { getSession } from "~/lib/session";

export async function GET(event: APIEvent) {
  const postId = event.params.post_id as string;
  const comments = await sql`select comment.*, users.id as user from comment inner join users on users.id = comment.user_id where comment.post_id = ${postId}`;
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
  const formdata = await event.request.formData();
  const content = formdata.get("content")!.toString();

  await sql`insert into comment (user_id, post_id, parent_id, content) values (${userId}, ${postId}, ${parentCommentId}, ${content})`;
  
  return reload();
}
