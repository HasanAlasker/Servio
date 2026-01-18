import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import UpcomingServiceModel from "../models/upcomingService.js";

const router = express.Router();

// get my upcoming services
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const services = await UpcomingServiceModel.find({
      customer: userId,
      status: { $nin: ["not active"] },
    })
      .sort({ "dueBy.Date": 1 })
      .populate("car", "make name model plateNumber mileage")
      .populate('parts', "name lastChangeDate lastChangeMileage recommendedChangeInterval");

    return res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
