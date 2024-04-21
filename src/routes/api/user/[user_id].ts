import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const { user_id } = event.params;

  const user = await sql`select 
  users.*, ARRAY_AGG(tag.name) as tags
  from users
  left join user_tags ON users.id = user_tags.user_id
  left join tag ON user_tags.tag_id = tag.id
  where users.id = ${user_id}
  GROUP BY users.id`
  return user[0];
}

export async function PATCH(event: APIEvent) {
  const { user_id } = event.params;
  const formdata = await event.request.formData();
  const tagId = parseInt(formdata.get("tag") as string);
  await sql`insert into user_tags (user_id, tag_id) values (${user_id}, ${tagId})`;
  return redirect("/admin");
}
