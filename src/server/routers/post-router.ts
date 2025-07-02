import { z } from "zod";
import { j, publicProcedure } from "../jstack";

export const postRouter = j.router({
  recent: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.superjson(posts);
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ c, input, ctx }) => {
      const { db } = ctx;

      const post = await db.post.create({
        data: {
          name: input.name,
        },
      });

      return c.superjson(post);
    }),
});
