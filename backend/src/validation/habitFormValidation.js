import { z } from "zod";

export const habitSchema = z.object({
  title: z.string().min(3).max(150),

  description: z.string().optional(),

  category: z.enum([
    "Health",
    "Fitness",
    "Study",
    "Work",
    "Meditation",
    "Reading",
    "Finance",
    "Social",
    "Other",
  ]),

  icon: z.string().max(100).optional(),

  color: z.string().max(50).optional(),

  frequency: z.enum(["Daily", "Weekly"]),

  targetdaysperweek: z
    .number()
    .int()
    .min(1)
    .max(7)
    .default(1),
});