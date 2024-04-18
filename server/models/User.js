import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    gender: {
      type: String,
      enum: ["man", "women"],
    },
    Status: {
      type: String,
      enum: ["banned", "not banned"],
    },
    ApplicationStatus: {
      type: String,
      enum: ["approved", "declined" , "pending"],
      default: "pending"
    },
    Subscription_type: {
      type: String,
      enum: ["All-in-one", "In-person" ,"online", "none"],
      default : "none",
    },
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
