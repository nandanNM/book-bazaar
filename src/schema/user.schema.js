import { z } from "zod";

export const registerUserSchema = z.object({
  fullName: z.string("Name is required"),
  email: z
    .string("email is required")
    .email({ message: "Invalid email address" }),
  password: z.string("password is required"),
});

export const loginUserSchema = z.object({
  email: z.email({ message: "Invalid Email address" }),
  password: z.string("password is required"),
});
