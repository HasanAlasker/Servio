import express from "express";
import mongoose from "mongoose";
import admin from "../middleware/admin.js";
import UserModel from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// get all users
router.get("/all", admin, async (req, res) => {
  try {
    const users = await UserModel.find("-isDeleted").sort("-createdAt");
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get deleted users
router.get("/deleted", admin, async (req, res) => {
  try {
    const deletedUsers = await UserModel.find("isDeleted").sort("-createdAt");
    return res.status(200).json({ success: true, data: deletedUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get by id
router.get("/:id", admin, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await UserModel.findById(id);
    if (!user)
      res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get me
router.get("/me", auth, async (req, res) => {
  try {
    const id = req.user._id;

    const user = await UserModel.findById(id);
    if (!user)
      res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// login

// register

// edit

// delete

export default router;
