import express from "express";
import mongoose from "mongoose";
import CarMakeModel from "../models/carMake.js";

const router = express.Router();

// get all

// get mine

// get name&model
router.get("/car-make", async (req, res) => {
  try {
    const carsData = await CarMakeModel.find();
    return res.status(200).json({ success: true, data: carsData });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// add car

// edit car

// edit mileage

// delete car

export default router;
