import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function DELETE(event: APIEvent) {
  const { tag_id } = event.params;
  await sql`DELETE FROM tag WHERE id = ${tag_id}`;
  return redirect("/admin");
}
