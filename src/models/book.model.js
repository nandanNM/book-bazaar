import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: [String],
    publisher: String,
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    description: String,
    isbn10: String,
    isbn13: { type: String, unique: true },
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String,
    },
    language: { type: String, default: "en" },
    price: {
      type: Number,
      required: true,
      min: 50,
    },
    category: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "COMIC",
        "EDUCATION",
        "SCIENCE",
        "OTHER",
      ],
      default: "OTHER",
      uppercase: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
