import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { validate } from "../utils/index.js";
import { registerUserSchema, loginUserSchema } from "../schema/index.js";
const userRoutes = express.Router();

userRoutes.post("/register", validate(registerUserSchema), register);
userRoutes.post("/login", validate(loginUserSchema), login);
// router.post("/logout", authMiddleware, logout);
// router.post("/api-key", authMiddleware, generateApiKey);
// router.get("/me", authMiddleware, getMe);

export default userRoutes;
