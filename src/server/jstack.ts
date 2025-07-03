import { db } from "@/lib/db";
import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";



interface Env {
  Bindings: {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
  };
}

export const j = jstack.init<Env>();

/**
 * Type-safely injects database into all procedures
 *
 * @see https://jstack.app/docs/backend/middleware
 */
const databaseMiddleware = j.middleware(async ({ next }) => {
  // const { DATABASE_URL } = env(c);

  return await next({ db });
});

const authMiddleware = j.middleware(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session) {
    throw new HTTPException(401, {
      message: "Unauthorized, sign in to continue.",
    });
  }

  return await next({ auth: { session } });
});

/**
 * Public (unauthenticated) procedures

 * This is the base piece you use to build new queries and mutations on the API.
 */
export const publicProcedure = j.procedure.use(databaseMiddleware);

/**
 * Private (unauthenticated) procedures

 * This is the base piece you use to build new queries and mutations on the API.
 */
export const privateProcedure = j.procedure
  .use(databaseMiddleware)
  .use(authMiddleware);
