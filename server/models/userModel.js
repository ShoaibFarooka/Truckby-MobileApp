const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    userName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    country: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true
    },
    companyName: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      default: 'male',
      enum: ['male', 'female', 'other']
    },
    role: {
      type: String,
      default: 'user',
      enum: ['seller', 'user']
    },
    refreshToken: {
      type: String,
      default: null
    },
    resetToken: {
      type: String,
      default: null
    },
    resetTokenExpiry: {
      type: Date,
      default: null
    },
    stripeCustomerId: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
