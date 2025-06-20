import express from "express";
import { createOrderSchema } from "../schemas/order.schema.js";
import {
  createOrder,
  deleteOrder,
  getOrderById,
} from "../controllers/order.controller.js";
import { validate } from "../utils/index.js";
import { isAuthenticated } from "../middlewares/auth.middlewares.js";

const orderRoute = express.Router();

orderRoute.post(
  "/create",
  validate(createOrderSchema),
  isAuthenticated,
  createOrder
);
orderRoute.get("/:id", isAuthenticated, getOrderById);
orderRoute.delete("/:id", isAuthenticated, deleteOrder);

export default orderRoute;
