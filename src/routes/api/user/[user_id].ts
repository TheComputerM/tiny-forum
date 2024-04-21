import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const { user_id } = event.params;

  // {tags: [<<user tag names>>]}
  const user = await sql`select users.* from users where users.id = ${user_id}`
  return user[0];
}

export async function PATCH(event: APIEvent) {
  const { user_id } = event.params;
  const formdata = await event.request.formData();
  const tagId = parseInt(formdata.get("tag") as string);
  await sql`insert into user_tags (user_id, tag_id) values (${user_id}, ${tagId})`;
  return redirect("/admin");
}
