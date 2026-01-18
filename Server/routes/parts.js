import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import PartModel from "../models/part.js";

const router = express.Router();

// get tracked parts for a car
router.get("/tracked/:id", auth, async (req, res) => {
  try {
    const id = req.params._id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const parts = await PartModel.find({ car: id, isTracked: true });

    return res.status(200).json({ success: true, data: parts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get my untracked parts
router.get("/un-tracked/:id", auth, async (req, res) => {
  try {
    const id = req.params._id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const parts = await PartModel.find({ car: id, isTracked: false });

    return res.status(200).json({ success: true, data: parts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get part by id
router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params._id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const part = await PartModel.findById(id);

    return res.status(200).json({ success: true, data: part });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// add part

// edit part

// delete part

export default router;
