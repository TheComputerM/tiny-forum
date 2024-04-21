import { createMiddleware } from "@solidjs/start/middleware";
import { getSession } from "vinxi/http";
import { SESSION_PASSWORD } from "./lib/session";
import { redirect } from "@solidjs/router";

export default createMiddleware({
  onRequest: [
    async (event) => {
      const session = await getSession(event.nativeEvent, {
        password: SESSION_PASSWORD,
      });
      if (
        event.request.url.includes("api/") ||
        event.request.url.includes("auth")
      )
        return;

      if (!Object.keys(session.data).length) {
        return redirect("/auth/login");
      }
    },
  ],
});
