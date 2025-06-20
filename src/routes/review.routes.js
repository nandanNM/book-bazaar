import expres from "express";
import {
  isAuthenticated,
  authroizedRoles,
} from "../middlewares/auth.middlewares.js";
import { validate } from "../utils/index.js";
import { addReviewToBookSchema } from "../schemas/review.schema.js";
import {
  addReviewForBook,
  deleteReview,
  getReviewsForBook,
} from "../controllers/review.controller.js";

const reviewRoute = expres.Router();
reviewRoute.post(
  "/books/:bookId/add",
  validate(addReviewToBookSchema),
  isAuthenticated,
  addReviewForBook
);
reviewRoute.get("/books/:bookId", isAuthenticated, getReviewsForBook);
reviewRoute.delete(
  "/:id",
  isAuthenticated,
  authroizedRoles("ADMIN"),
  deleteReview
);

export default reviewRoute;
