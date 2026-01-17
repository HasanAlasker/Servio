import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import ReportModel from "../models/report.js";
import validate from "../middleware/joiValidation.js";
import { createReport } from "../validation/report.js";

const router = express.Router();

// get all reports
router.get("/open", [auth, admin], async (req, res) => {
  try {
    const reports = await ReportModel.find({ status: "open" }).sort(
      "-createdAt",
    );
    return res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// make report
router.post("/create", [auth, validate(createReport)], async (req, res) => {
  try {
    const data = req.body;
    data.reporter = req.user._id;

    const report = await ReportModel(data);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not created",
      });
    }
    return res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// close report
router.put("/close/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const report = await Model.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const closedReport = await ReportModel.findByIdAndUpdate(
      id,
      { status: "closed" },
      { timestamps: true, new: true },
    );

    return res.status(200).json({ success: true, data: closedReport });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
