import * as z from "zod";

export const eventCreationSchema = z
  .object({
    name: z
      .string()
      .max(50, "Name must not exceed 50 characters")
      .min(3, "Name must contain atleast 3 characters"),
    start: z.date(),
    end: z.date(),
    color: z.string().optional().nullable(),
  })
  .refine((val) => val.end > val.start, {
    message: "End date cannot be earlier than start date",
    path: ["end"],
  });
