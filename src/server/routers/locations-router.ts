import { z } from "zod";
import { j, protectedProcedure } from "../jstack";

export const locationsRouter = j.router({
  getSaved: protectedProcedure.query(async ({ c, ctx }) => {
    const { db, session } = ctx;

    const locations = await db.savedLocation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return c.superjson(locations);
  }),

  save: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        address: z.string().min(1, "Address is required"),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      })
    )
    .mutation(async ({ c, input, ctx }) => {
      const { db, session } = ctx;

      const { name, address, latitude, longitude } = input;

      const location = await db.savedLocation.create({
        data: {
          userId: session.user.id,
          name,
          address,
          latitude,
          longitude,
        },
      });

      return c.superjson(location);
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ c, input, ctx }) => {
      const { db, session } = ctx;
      const { id } = input;

      // Ensure user owns this location
      const location = await db.savedLocation.findFirst({
        where: { id, userId: session.user.id },
      });

      if (!location) {
        throw new Error("Location not found or access denied");
      }

      await db.savedLocation.delete({
        where: { id },
      });

      return c.superjson({ success: true });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(1, "Name is required").optional(),
        address: z.string().min(1, "Address is required").optional(),
        latitude: z.number().min(-90).max(90).optional(),
        longitude: z.number().min(-180).max(180).optional(),
      })
    )
    .mutation(async ({ c, input, ctx }) => {
      const { db, session } = ctx;
      const { id, ...updateData } = input;

      // Ensure user owns this location
      const location = await db.savedLocation.findFirst({
        where: { id, userId: session.user.id },
      });

      if (!location) {
        throw new Error("Location not found or access denied");
      }

      const updatedLocation = await db.savedLocation.update({
        where: { id },
        data: updateData,
      });

      return c.superjson(updatedLocation);
    }),
});
