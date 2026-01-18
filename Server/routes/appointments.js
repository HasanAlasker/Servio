import express from "express";
import mongoose from "mongoose";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import AppointmentModel from "../models/appointment.js";
import shopOwner from "../middleware/shopOwner.js";
import validate from "../middleware/joiValidation.js";
import {
  createAppointmentSchema,
  editAppointmentSchema,
} from "../validation/appointment.js";
import ShopModel from "../models/shop.js";

const router = express.Router();

// get all
router.get("/all", [auth, admin], async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    return res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// todo: these get appointments should get the ones spesific to the user requesting them!

// get confiremd
router.get("/confirmed", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const confimed = await AppointmentModel.find({ status: "confirmed" }).sort(
      "-createdAt",
    );
    return res.status(200).json({ success: true, data: confimed });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get comleted
router.get("/completed", auth, async (req, res) => {
  try {
    const completed = await AppointmentModel.find({ status: "completed" }).sort(
      "-createdAt",
    );
    return res.status(200).json({ success: true, data: completed });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get pending
router.get("/pending", auth, async (req, res) => {
  try {
    const pending = await AppointmentModel.find({ status: "pending" }).sort(
      "-createdAt",
    );
    return res.status(200).json({ success: true, data: pending });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// make appointment
router.post(
  "/book",
  [auth, validate(createAppointmentSchema)],
  async (req, res) => {
    try {
      const data = req.body;
      data.customer = req.user._id;

      const shop = await ShopModel.findById(data.shop);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }

      const appointment = new AppointmentModel(data);
      await appointment.save();

      if (!appointment)
        res
          .status(400)
          .json({ success: false, message: "Failed to make appointment" });

      return res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
);

// confirm appointment (shopOwner)
router.put(
  "/confirm/:id",
  [auth, shopOwner, validate(editAppointmentSchema)],
  async (req, res) => {
    try {
      const id = req.params.id;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid car ID",
        });
      }

      const confirmed = await AppointmentModel.findByIdAndUpdate(
        id,
        {
          status: "confirmed",
        },
        { runValidators: true, new: true },
      );

      if (!confirmed)
        res
          .status(400)
          .json({ success: false, message: "Failed to confirm appointment" });

      return res.status(200).json({ success: true, data: confirmed });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
);

// reject appointment (shopOwner)
router.put("/reject/:id", shopOwner, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car ID",
      });
    }

    const rejected = await AppointmentModel.findByIdAndUpdate(
      id,
      {
        isRejected: true,
      },
      { runValidators: true, new: true },
    );

    if (!rejected)
      res
        .status(400)
        .json({ success: false, message: "Failed to reject appointment" });

    return res.status(200).json({ success: true, data: rejected });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// mark completed (shopOwner)
router.put(
  "/completed/:id",
  [auth, shopOwner, validate(editAppointmentSchema)],
  async (req, res) => {
    try {
      const id = req.params.id;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid car ID",
        });
      }

      const completed = await AppointmentModel.findByIdAndUpdate(
        id,
        {
          status: "completed",
        },
        { runValidators: true, new: true },
      );

      if (!completed)
        res
          .status(400)
          .json({ success: false, message: "Failed to confirm appointment" });

      return res.status(200).json({ success: true, data: completed });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
);

// mark no-show (shopOwner)
router.put(
  "/no-show/:id",
  [auth, shopOwner, validate(editAppointmentSchema)],
  async (req, res) => {
    try {
      const id = req.params.id;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid car ID",
        });
      }

      const noShow = await AppointmentModel.findByIdAndUpdate(
        id,
        {
          status: "no-show",
        },
        { runValidators: true, new: true },
      );

      if (!noShow)
        res
          .status(400)
          .json({ success: false, message: "Failed to confirm appointment" });

      return res.status(200).json({ success: true, data: noShow });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
);

// cancel (car owner if not accepted yet)
router.put(
  "/cancel/:id",
  [auth, validate(editAppointmentSchema)],
  async (req, res) => {
    try {
      const id = req.params.id;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid car ID",
        });
      }

      const appointment = await AppointmentModel.findById(id);
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      if (appointment.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "You can't cancel an appointment unless it's pending",
        });
      }

      const canceled = await AppointmentModel.findByIdAndUpdate(
        id,
        {
          status: "canceled",
        },
        { runValidators: true, new: true },
      );

      if (!canceled)
        res
          .status(400)
          .json({ success: false, message: "Failed to confirm appointment" });

      return res.status(200).json({ success: true, data: canceled });
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
