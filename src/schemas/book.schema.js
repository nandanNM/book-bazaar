import { z } from "zod";

export const addBookSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  authors: z
    .array(z.string())
    .nonempty({ message: "At least one author is required" }),
  publisher: z.string().optional(),
  publishedDate: z.coerce.date({ required_error: "Publish date is required" }),
  description: z.string().optional(),
  isbn10: z.string().optional(),
  isbn13: z
    .string({ required_error: "ISBN-13 is required" })
    .length(13, "ISBN-13 must be exactly 13 characters"),
  imageLinks: z
    .object({
      smallThumbnail: z.string().url().optional(),
      thumbnail: z.string().url().optional(),
    })
    .optional(),
  language: z.string().default("en"),
  price: z
    .number({ required_error: "Price is required" })
    .min(50, "Price must be at least 50"),
  stock: z.number().int().nonnegative().default(0),
  category: z
    .enum(["FICTION", "NON_FICTION", "COMIC", "EDUCATION", "SCIENCE", "OTHER"])
    .default("OTHER"),
});
