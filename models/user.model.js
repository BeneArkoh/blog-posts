import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is  required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", userSchema);
