import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";
import { getSession } from "~/lib/session";

export async function POST(event: APIEvent) {
  const formdata = await event.request.formData();
  const email = formdata.get("email") as string;
  
  const user = await sql`select * from users where email = ${email}`;

  const session = await getSession();
  await session.update((s) => s.user = user[0])
  
  return redirect("/");
}
