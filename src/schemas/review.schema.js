import { z } from "zod";
export const addReviewToBookSchema = z.object({
  review: z.string("Review is required"),
  rating: z.number("rating is required").max(5, "you can give max rating 5"),
});
