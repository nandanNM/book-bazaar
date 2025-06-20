import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Book } from "../models/book.model.js";
export const addBook = asyncHandler(async (req, res) => {
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    isbn13,
    isbn10,
    imageLinks,
    language,
    price,
    stock,
    category,
  } = req.validateBody;

  const newBook = await Book.create({
    title,
    authors,
    publisher,
    publishedDate,
    description,
    isbn13,
    isbn10,
    imageLinks,
    language,
    price,
    stock,
    category,
  });
  if (!newBook) {
    throw new ApiError(500, "Failed to create book");
  }
  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Book created successfully",
      data: newBook,
    })
  );
});
export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  if (!books || books.length === 0) {
    throw new ApiError(404, "No books found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Books retrieved successfully",
      data: books,
    })
  );
});
export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Book retrieved successfully",
      data: book,
    })
  );
});
export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    isbn13,
    isbn10,
    imageLinks,
    language,
    price,
    category,
  } = req.validateBody;
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      isbn13,
      isbn10,
      imageLinks,
      language,
      price,
      category,
    },
    { new: true }
  );
  if (!updatedBook) {
    throw new ApiError(404, "Book not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Book updated successfully",
      data: updatedBook,
    })
  );
});

export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Book deleted successfully",
    })
  );
});
