import express from "express";
import {
  generateApiKey,
  getMe,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { validate } from "../utils/index.js";
import { registerUserSchema, loginUserSchema } from "../schema/user.schema.js";
import { isAuthenticated } from "../middlewares/auth.middlewares.js";

const userRoute = express.Router();

userRoute.post("/register", validate(registerUserSchema), register);
userRoute.post("/login", validate(loginUserSchema), login);
userRoute.get("/logout", isAuthenticated, logout);
userRoute.get("/api-key", isAuthenticated, generateApiKey);
userRoute.get("/me", isAuthenticated, getMe);

export default userRoute;
