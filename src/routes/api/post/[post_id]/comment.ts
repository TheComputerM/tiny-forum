import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const postId = event.params.post_id as string;
  const comments = await sql`select * from comment where post_id = ${postId}`;
  return comments;
}

export async function POST(event: APIEvent) {
  const postId = event.params.post_id as string;
  
}