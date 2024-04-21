import { createMiddleware } from "@solidjs/start/middleware";
import { getSession } from "vinxi/http";
import { SESSION_PASSWORD } from "./lib/session";

export default createMiddleware({
  onRequest: [
    async (event) => {
      const session = await getSession(event.nativeEvent, {
        password: SESSION_PASSWORD
      });
      
    },
  ],
});
