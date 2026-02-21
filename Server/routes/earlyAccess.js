import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import EarlyAccessModel from "../models/earlyAccess.js";
import validate from "../middleware/joiValidation.js";
import { earlyAccessSchema } from "../validation/earlyAccess.js";

const router = express.Router();

// get pending
router.get("/pending", [auth, admin], async (req, res) => {
  try {
    const pending = await EarlyAccessModel.find({
      isInvitationSent: false,
    }).sort("createdAt");
    return res.status(200).json({ success: true, data: pending });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get sent
router.get("/sent", [auth, admin], async (req, res) => {
  try {
    const sent = await EarlyAccessModel.find({
      isInvitationSent: true,
    }).sort("createdAt");
    return res.status(200).json({ success: true, data: sent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// make request
router.post("/request", validate(earlyAccessSchema), async (req, res) => {
  try {
    const data = req.body;

    const existingReq = await EarlyAccessModel.findOne({
      $or: [{ phone: data.phone, email: data.email }],
    });
    if (existingReq) {
      return res
        .status(400)
        .json({ success: false, message: "Phone or email already used" });
    }

    const earlyAccessReq = new EarlyAccessModel(data);
    await earlyAccessReq.save();

    return res.status(201).json({ success: true, data: earlyAccessReq });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// mark as sent
router.patch("/mark-sent/:id", [auth, admin], async (req, res) => {
  try {
    const requestId = req.params.id;

    if (!requestId || !mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID",
      });
    }

    const updatedRequest = await EarlyAccessModel.findByIdAndUpdate(
      requestId,
      { isInvitationSent: true },
      { runValidators: true, new: true },
    );
    if (!updatedRequest) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update" });
    }

    return res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
