import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true, index: true },
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
      required: true,
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

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export const User = mongoose.model("User", userSchema);
