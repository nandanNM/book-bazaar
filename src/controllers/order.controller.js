import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { Order } from "../models/order.model.js";
import { Book } from "../models/book.model.js";
import { Types } from "mongoose";
export const createOrder = asyncHandler(async (req, res) => {
  const { books, address, city, pincode, state, paymentStatus, totalAmount } =
    req.validateBody;
  const bookIds = books.map(book => new Types.ObjectId(book.bookId));
  const existingBooks = await Book.find({ _id: { $in: bookIds } }).select(
    "_id"
  );

  const existingIds = existingBooks.map(book => book._id.toString());
  const missingBooks = bookIds
    .map(id => id.toString())
    .filter(id => !existingIds.includes(id));

  if (missingBooks.length > 0) {
    throw new ApiError(
      404,
      `Books with IDs ${missingBooks.join(", ")} not found`
    );
  }
  const order = await Order.create({
    userId: req.user._id,
    books,
    address,
    city,
    pincode,
    state,
    paymentStatus,
    totalAmount,
  });

  if (!order) {
    throw new ApiError(403, "Order creation failed");
  }

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: order,
      message: "Order created successfully",
    })
  );
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: order,
      message: "Order retrieved successfully",
    })
  );
});
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Order deleted successfully",
    })
  );
});
