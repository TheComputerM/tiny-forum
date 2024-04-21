import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function DELETE(event: APIEvent) {
  const { tag_id } = event.params;
  await sql`CALL delete_by_tag(${tag_id})`;
  return redirect("/admin");
}
