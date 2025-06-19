import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validateBody;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (!newUser) {
    throw new ApiError(403, "user register failed");
  }
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  const token = jwt.sign(
    {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res
    .status(201)
    .cookie("book-bazaar", token, cookieOptions)
    .json(new ApiResponse(201, newUser, "user registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validateBody;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not exist, please register or signup");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "email or password incorrect");
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res
    .status(201)
    .cookie("book-bazaar", token, cookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          id: user._id,
          name: user.name,
          email,
        },
        "user logged in successfully"
      )
    );
});
