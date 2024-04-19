import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const postId = parseInt(event.params.post_id);
  const post = await sql`select * from post where id = ${postId}`;
  return post[0];
}
