import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, trim: true, select: false },
    avater: {
      type: String,
    },
    avaterPublic_id: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
      uppercase: true,
    },
    isVerified: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
