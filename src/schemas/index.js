import { z } from "zod/v4";

export const createOrderSchema = z.object({
  address: z.string("Address is required"),
  city: z.string("City is required"),
  pincode: z.number("pincode is required"),
  state: z.string("State is required"),
});
