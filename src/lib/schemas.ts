import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
});
