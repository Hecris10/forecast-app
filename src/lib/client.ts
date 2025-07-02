import type { AppRouter } from "@/server";
import { createAuthClient } from "better-auth/react";
import { createClient } from "jstack";

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */
export const backendClient = createClient<AppRouter>({
  baseUrl: "http://localhost:3000/api",
});

export const authClient = createAuthClient({
  //you can pass client configuration here
});
