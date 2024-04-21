import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const data = await sql`select * from tag`;
  return data;
}

export async function POST(event: APIEvent) {
  const formdata = await event.request.formData();
  const name = (await formdata.get("name")) as string;
  const description = (await formdata.get("description")) as string;
  await sql`insert into tag (name, description) values (${name}, ${description})`;
  return redirect("/admin");
}
