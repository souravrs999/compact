import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string(),
});
