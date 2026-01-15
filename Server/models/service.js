import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
});

const ServiceModel = mongoose.model("Service", serviceSchema);
export default ServiceModel;
