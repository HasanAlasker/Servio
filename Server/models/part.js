import mongoose from "mongoose";

const partSchema = new mongoose.Schema({});

const PartModel = mongoose.model("Part", partSchema);
export default PartModel;
