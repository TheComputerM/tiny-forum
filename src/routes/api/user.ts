import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET(event: APIEvent) {
  const userId = 1;
  /**
   * TODO(praharsh): also get the user's tags in the output
   * ```json
   * {
   *    id: <<user_id>>,
   *    ...,
   *    tags: [{
   *      name: <<tag_name>>,
   *      description: <<tag_description>>
   *    }]
   * }
   * ```
   */
  const user = await sql`select * from users where id = ${userId}`;

  return user[0];
}
