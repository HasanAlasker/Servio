import mongoose from "mongoose";

const upcomingServiceSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Part",
      required: true,
    },
  ],
  dueBy: {
    date: {
      type: Date,
      index: true,
    },
    mileage: {
      type: Number,
      min: 0,
    },
  },
  status: {
    type: String,
    enum: ["not active", "soon", "due", "over due"],
  },
});

const UpcomingServiceModel = mongoose.model(
  "UpcomingService",
  upcomingServiceSchema
);
export default UpcomingServiceModel;
