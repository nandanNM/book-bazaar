import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller.js";
import {
  authroizedRoles,
  isAuthenticated,
} from "../middlewares/auth.middlewares.js";
import { validate } from "../utils/index.js";
import { addBookSchema } from "../schema/book.schema.js";

const bookRoute = express.Router();

bookRoute.post(
  "/add",
  validate(addBookSchema),
  isAuthenticated,
  authroizedRoles("ADMIN"),
  addBook
);

bookRoute.get("/get-all-books", getAllBooks);

bookRoute.get("/:id", getBookById);

bookRoute.put(
  "/:id",
  validate(addBookSchema),
  isAuthenticated,
  authroizedRoles("ADMIN"),
  updateBook
);
bookRoute.delete("/:id", isAuthenticated, authroizedRoles("ADMIN"), deleteBook);

export default bookRoute;
