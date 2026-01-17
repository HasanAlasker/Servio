import mongoose from "mongoose";

const partSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "engine oil",
        "oil filter",
        "air filter",
        "brake pads",
        "brake fluid",
        "coolant",
        "transmission fluid",
        "spark plugs",
        "battery",
        "tires",
        "timing belt",
        "wiper blades",
      ],
    },
    recommendedChangeInterval: {
      months: {
        type: Number,
        min: 0,
      },
      miles: {
        type: Number,
        min: 0,
      },
    },
    lastChangeDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v <= new Date();
        },
        message: "Last change date cannot be in the future",
      },
    },
    lastChangeMileage: {
      type: Number,
      required: true,
      min: [0, "Mileage cannot be negative"],
    },
    isTracked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps },
);

const PartModel = mongoose.model("Part", partSchema);
export default PartModel;
