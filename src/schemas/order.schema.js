import { z } from "zod";

export const createOrderSchema = z.object({
  books: z
    .array(
      z.object({
        bookId: z
          .string({ required_error: "Book ID is required" })
          .min(1, "Invalid book ID"),
        priceAtPurchase: z.number({ required_error: "Price is required" }),
      })
    )
    .min(1, "At least one book is required"),

  address: z.string({ required_error: "Address is required" }).min(1),
  city: z.string({ required_error: "City is required" }).min(1),
  pincode: z
    .number({ required_error: "Pincode is required" })
    .int("Pincode must be an integer")
    .nonnegative("Pincode cannot be negative"),
  state: z.string({ required_error: "State is required" }).min(1),

  paymentStatus: z.enum(["PENDING", "PAID", "FAILED"]).default("PENDING"),

  totalAmount: z.number({ required_error: "Total amount is required" }),
});
