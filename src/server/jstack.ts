import { getServerAuthSection } from "@/lib/auth";
import { db } from "@/lib/db";
import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";

interface Env {
  Bindings: {
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    DATABASE_URL: string;
  };
}

export const j = jstack.init<Env>();

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */

const databaseMiddleware = j.middleware(async ({ c, next }) => {
  // const { DATABASE_URL } = env(c)

  return await next({ db });
});

const authMiddleware = j.middleware(async ({ c, next }) => {
  // Mocked user authentication check...

  const session = await getServerAuthSection();

  if (!session || !session.user) {
    throw new HTTPException(401, {
      message: "Unauthorized, sign in to continue.",
    });
  }

  // 👇 Attach user to `ctx` object
  await next({ session: session.user, db });
});
export const publicProcedure = j.procedure.use(databaseMiddleware);
export const protectedProcedure = j.procedure
  .use(authMiddleware)
  .use(databaseMiddleware);
