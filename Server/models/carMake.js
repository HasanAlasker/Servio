import mongoose from "mongoose";

const carMakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  models: [
    {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  ],
});

const CarMakeModel = mongoose.model("CarMake", carMakeSchema);
export default CarMakeModel;
