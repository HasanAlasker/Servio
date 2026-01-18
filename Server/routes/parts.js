import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import PartModel from "../models/part.js";
import validate from "../middleware/joiValidation.js";
import { addPartSchema, editPartSchema } from "../validation/part.js";
import { updateServicesForCar } from "../services/upcomingServiceManager.js";

const router = express.Router();

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

// get tracked parts for a car
router.get("/tracked/:id", auth, async (req, res) => {
  try {
    const carId = req.params._id;

    if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const parts = await PartModel.find({ car: carId, isTracked: true });

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
    const carId = req.params._id;

    if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const parts = await PartModel.find({ car: carId, isTracked: false });

    return res.status(200).json({ success: true, data: parts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// add part
router.post("/add/:id", [auth, validate(addPartSchema)], async (req, res) => {
  try {
    const carId = req.params.id;
    const data = req.body;

    data.car = carId;

    if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const newPart = new PartModel(data);
    if (!newPart) {
      return res.status(404).json({
        success: false,
        message: "Part not added",
      });
    }

    await updateServicesForCar(carId);

    newPart.save();

    return res.status(201).json({ success: true, data: newPart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// edit part
router.put("/edit/:id", [auth, validate(editPartSchema)], async (req, res) => {
  try {
    const partId = req.params.id;
    const data = req.body;

    if (!partId || !mongoose.Types.ObjectId.isValid(partId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const part = await PartModel.findById(partId);
    if (!part) {
      return res.status(404).json({
        success: false,
        message: "Part not found",
      });
    }

    const updatedPart = await PartModel.findByIdAndUpdate(partId, data, {
      runValidators: true,
      new: true,
    });
    if (!updatedPart) {
      return res.status(404).json({
        success: false,
        message: "Failed to edit part",
      });
    }

    await updateServicesForCar(updatedPart.car);

    return res.status(200).json({ success: true, data: updatedPart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// untrack part
router.put(
  "/un-track/:id",
  [auth, validate(editPartSchema)],
  async (req, res) => {
    try {
      const partId = req.params.id;

      if (!partId || !mongoose.Types.ObjectId.isValid(partId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid resource ID",
        });
      }

      const part = await PartModel.findById(partId);
      if (!part) {
        return res.status(404).json({
          success: false,
          message: "Part not found",
        });
      }

      const updatedPart = await PartModel.findByIdAndUpdate(
        partId,
        { isTracked: false },
        {
          runValidators: true,
          new: true,
        },
      );
      if (!updatedPart) {
        return res.status(404).json({
          success: false,
          message: "Failed to edit part",
        });
      }

      return res.status(200).json({ success: true, data: updatedPart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
);

export default router;
