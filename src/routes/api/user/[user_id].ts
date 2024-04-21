import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function PATCH(event: APIEvent) {
  const { user_id } = event.params;
  const formdata = await event.request.formData();
  const tagId = parseInt(formdata.get("tag") as string);
  await sql`insert into user_tags (user_id, tag_id) values (${user_id}, ${tagId})`;
  return redirect("/admin");
}
