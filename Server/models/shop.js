import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({});

const ShopModel = mongoose.model("Shop", shopSchema);
export default ShopModel;
