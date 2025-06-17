import mongoose from "mongoose";
import { asyncHandler } from "../utils/async-handler.js";

export const connectToDB = asyncHandler(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
});
