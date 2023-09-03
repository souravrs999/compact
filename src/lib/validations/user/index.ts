import * as z from "zod";

export const userProfileSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be atleast 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be atleast 2 characters" }),
  company: z
    .string()
    .min(2, { message: "Company must be atleast 2 characters" }),
  designation: z.string().optional(),
  address: z
    .string()
    .min(5, { message: "Address must be atleast 5 characters" }),
  city: z.string().min(5, { message: "City must be atleast 5 characters" }),
  country: z
    .string()
    .min(5, { message: "Country must be atleast 5 characters" }),
  state: z.string().min(5, { message: "State must be atleast 5 characters" }),
  zip: z.string().min(5, { message: "State must be atleast 5 characters" }),
});
