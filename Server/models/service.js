import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({});

const ServiceModel = mongoose.model("Service", serviceSchema);
export default ServiceModel;
