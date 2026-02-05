import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: Date,
  from: String,
  to: String,
});

const SlotModel = mongoose.model("Slot", slotSchema);
