import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Review } from "../models/review.model.js";
import { Book } from "../models/book.model.js";

export const addReviewForBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const { review, rating } = req.validateBody;
  const existingBook = await Book.findById(bookId);
  if (!existingBook) {
    throw new ApiError(404, "Book not found");
  }
  const newReview = await Review.create({
    bookId,
    userId: req.user._id,
    review,
    rating,
  });

  if (!newReview) {
    throw new ApiError(403, "Failed to add review");
  }

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: newReview,
      message: "Review added successfully",
    })
  );
});
export const getReviewsForBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const reviews = await Review.find({ bookId })
    .populate("userId", "fullName email")
    .sort({ createdAt: -1 });
  if (!reviews || reviews.length === 0) {
    throw new ApiError(404, "No reviews found for this book");
  }

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: reviews,
      message: "Reviews fetched successfully",
    })
  );
});
export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Review deleted successfully",
    })
  );
});
