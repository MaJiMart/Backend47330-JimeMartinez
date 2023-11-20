import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String },
    rol: { type: String, default: 'user' },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
