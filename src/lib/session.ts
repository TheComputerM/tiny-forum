"use server";

import { useSession, clearSession } from "vinxi/http";

const SESSION_PASSWORD = "93464661718937656082123912291502";

export async function getSession() {
  return await useSession({
    password: SESSION_PASSWORD,
  });
}

export async function removeSession() {
  await clearSession({
    password: SESSION_PASSWORD,
  });
}
