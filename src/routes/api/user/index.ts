import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";
import { POST as login } from "../auth/login";

export async function GET(event: APIEvent) {
  /**
   * TODO(praharsh): also get the user's tags in the output
   * ```json
   * {
   *    id: <<user_id>>,
   *    ...,
   *    tags: [{
   *      name: <<tag_name>>,
   *    }]
   * }
   * ```
   */
  const user = await sql`select * from users`;

  return user;
}

export async function POST(event: APIEvent) {
  const formdata = await event.request.formData();
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  await sql`insert into users (name, email) values (${name}, ${email})`;

  return login(event);
}
