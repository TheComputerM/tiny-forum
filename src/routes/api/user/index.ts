import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";
import { redirect } from "@solidjs/router";

export async function GET(event: APIEvent) {
  /**
   * TODO(praharsh): also get the user's tags in the output
   * ```json
   * {
   *    id: <<user_id>>,
   *    ...,
   *    tags: [tag_name, ...]
   * }
   * ```
   */
//   const user = await sql`
//   select  users.*, ARRAY_AGG(tag.name) as tags 
//   from users
//   left join user_tags ON users.id = user_tags.user_id
//   left join tag ON user_tags.tag_id = tag.id
//   group by users.id;
// `;
const user = await sql`select * from user_tags`;

  return user;
}

export async function POST(event: APIEvent) {
  const formdata = await event.request.formData();
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  await sql`insert into users (name, email) values (${name}, ${email})`;

  return redirect("/auth/login");
}
