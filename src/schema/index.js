import { z } from "zod/v4";

export const registerUserSchema = z.object({
  name: z.string("Name is required"),
  email: z
    .string("email is required")
    .email({ message: "Invalid email address" }),
  password: z.string("password is required"),
});

export const loginUserSchema = z.object({
  email: z
    .string("email is required")
    .email({ message: "Invalid Email address" }),
  password: z.string("password is required"),
});

export const addBookSchema = z.object({
  name: z.string("Name is required"),
  author: z.string("author name is requried"),
  price: z.number("Price is requried"),
  isbnNo: z.string("ISBN no is required"),
  publish: z.iso.date("publish date is required"),
});

export const addReviewToBookSchema = z.object({
  review: z.string("Review is required"),
  rating: z.number("rating is required").max(5, "you can give max rating 5"),
});

export const createOrderSchema = z.object({
  address: z.string("Address is required"),
  city: z.string("City is required"),
  pincode: z.number("pincode is required"),
  state: z.string("State is required"),
});
