import { z } from "zod/v4";

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
