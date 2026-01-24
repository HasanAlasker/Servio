import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [25, "Name can't be longer than 25 characters"],
      match: [/^[a-zA-Z\s'-]+$/, "Please enter a valid name"],
      required: true,
      trim: true,
    },
    services: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    address: {
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
    },
    openHours: {
      sun: { isOpen: Boolean, from: String, to: String },
      mon: { isOpen: Boolean, from: String, to: String },
      tue: { isOpen: Boolean, from: String, to: String },
      wed: { isOpen: Boolean, from: String, to: String },
      thu: { isOpen: Boolean, from: String, to: String },
      fri: { isOpen: Boolean, from: String, to: String },
      sat: { isOpen: Boolean, from: String, to: String },
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ShopModel = mongoose.model("Shop", shopSchema);
export default ShopModel;
