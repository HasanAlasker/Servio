import mongoose from "mongoose";

const carSchema = new mongoose.Schema({});

const CarModel = mongoose.model("Car", carSchema);
export default CarModel;
