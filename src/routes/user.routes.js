import express from "express";
import {
  generateApiKey,
  getMe,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { validate } from "../utils/index.js";
import { registerUserSchema, loginUserSchema } from "../schema/index.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const userRoute = express.Router();

userRoute.post("/register", validate(registerUserSchema), register);
userRoute.post("/login", validate(loginUserSchema), login);
userRoute.get("/logout", authMiddleware, logout);
userRoute.get("/api-key", authMiddleware, generateApiKey);
userRoute.get("/me", authMiddleware, getMe);

export default userRoute;
