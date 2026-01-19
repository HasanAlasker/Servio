import express from "express";
import mongoose from "mongoose";
import admin from "../middleware/admin.js";
import UserModel from "../models/user.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/joiValidation.js";
import {
  userLoginSchema,
  userRegistrationSchema,
  userUpdateSchema,
} from "../validation/user.js";

const router = express.Router();

// get all users
router.get("/all", async (req, res) => {
  try {
    const users = await UserModel.find({ isDeleted: false })
      .sort("-createdAt")
      .select("-password");
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
router.get("/deleted", [auth, admin], async (req, res) => {
  try {
    const deletedUsers = await UserModel.find({ isDeleted: true })
      .sort("-createdAt")
      .select("-password");
    return res.status(200).json({ success: true, data: deletedUsers });
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

    const user = await UserModel.findById(id).select("-password");
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

    const user = await UserModel.findById(id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// register
router.post("/register", validate(userRegistrationSchema), async (req, res) => {
  try {
    const data = req.body;

    const existingUser = await UserModel.findOne({ email: data.email }).select(
      "-password"
    );
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });

    const usedPhone = await UserModel.findOne({ phone: data.phone });
    if (usedPhone)
      return res
        .status(400)
        .json({ success: false, message: "Phone number already used" });

    const newUser = new UserModel(data);

    newUser.password = await newUser.hashPassword(data.password);
    newUser.save();

    const token = newUser.generateAuthToken();

    if (!newUser)
      return res
        .status(404)
        .json({ success: false, message: "Failed to register" });

    return res
      .status(201)
      .header("x-auth-token", token)
      .json({ success: true, message: "Registered successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// login
router.post("/login", validate(userLoginSchema), async (req, res) => {
  try {
    const data = req.body;

    const user = await UserModel.findOne({ email: data.email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const validPassword = await user.comparePassword(data.password);

    if (!validPassword)
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });

    const token = await user.generateAuthToken();

    return res
      .status(201)
      .header("x-auth-token", token)
      .json({ success: true, message: "Login successful" })
      .header();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// edit
router.patch(
  "/edit/:id",
  [auth, validate(userUpdateSchema)],
  async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }

      if (req.user._id !== id)
        return res
          .status(400)
          .json({ success: false, message: "You cant edit this user" });

      if (data.password) {
        const user = await UserModel.findById(id);
        const hashedPassword = await user.hashPassword(data.password);
        data.password = hashedPassword;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      }).select("-password");

      if (!updatedUser)
        return res
          .status(404)
          .json({ success: false, message: "Failed to update" });

      return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// soft delete
router.patch("/delete/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        runValidators: true,
        new: true,
      }
    ).select("-password");

    if (!deletedUser)
      return res
        .status(404)
        .json({ success: false, message: "Failed to delete" });

    return res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// un delete
router.patch("/un-delete/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      {
        runValidators: true,
        new: true,
      }
    ).select("-password");

    if (!deletedUser)
      return res
        .status(404)
        .json({ success: false, message: "Failed to delete" });

    return res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// add push token

export default router;
