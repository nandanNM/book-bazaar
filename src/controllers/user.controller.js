import jwt from "jsonwebtoken";
import crypto from "crypto";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js";
import { ApiKey } from "../models/apikey.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { getFutureDate } from "../utils/index.js";

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.validateBody;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  if (!newUser) {
    throw new ApiError(403, "User registration failed");
  }
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  const token = jwt.sign(
    {
      id: newUser._id,
      fullName,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res
    .status(201)
    .cookie("book-bazaar", token, cookieOptions)
    .json(
      new ApiResponse({
        statusCode: 201,
        data: {
          id: newUser._id,
          fullName,
          email: newUser.email,
        },
        message: "User registered successfully",
      })
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validateBody;
  const user = await User.findOne({ email }).select("+password");

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
    {
      id: user._id,
      fullname: user.fullName,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res
    .status(201)
    .cookie("book-bazaar", token, cookieOptions)
    .json(
      new ApiResponse({
        statusCode: 201,
        data: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        message: "User logged in successfully",
      })
    );
});

export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("book-bazaar")
    .json(
      new ApiResponse({
        Message: "User logged out successfully",
      })
    );
});

export const getMe = asyncHandler((req, res) => {
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: {
        id: req.user.id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role,
      },
      message: "User fetched successfully",
    })
  );
});

export const generateApiKey = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const genApiKey = crypto.randomBytes(32).toString("hex");

  const apiKey = await ApiKey.create({
    userId,
    apiKey: genApiKey,
    expiresAt: getFutureDate("15d"),
  });

  if (!apiKey) {
    return next(new ApiError(403, "Api key genration failed"));
  }

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: {
        apiKey: apiKey.apiKey,
        expiresAt: apiKey.expiresAt,
      },
    })
  );
});
