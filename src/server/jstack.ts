import { db } from "@/lib/db";
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

export const publicProcedure = j.procedure.use(databaseMiddleware);
