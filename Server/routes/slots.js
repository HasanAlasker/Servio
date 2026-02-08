import express from "express";
import auth from "../middleware/auth.js";
import { SlotModel } from "../models/slots.js";

const router = express.Router();

// get busy slots
router.get("/busy/:id", auth, async (req, res) => {
  try {
    const shopId = req.params.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    // Create date range for the entire day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const busySlots = await SlotModel.find({
      shop: shopId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    return res.status(200).json({ success: true, data: busySlots });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// check slot
router.post("/checkSlot/:id", auth, async (req, res) => {
  try {
    const shopId = req.params.id;
    const { date, from } = req.body;

    if (!date || !from) {
      return res.status(400).json({
        success: false,
        message: "Date and from time are required",
      });
    }

    // Get the date part only (ignore time for date matching)
    const appointmentDate = new Date(date);
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Calculate end time as string (2 hours after from)
    const [hours, minutes] = from.split(":");
    const endHour = (parseInt(hours, 10) + 2).toString().padStart(2, '0');
    const to = `${endHour}:${minutes}`;

    // Find overlapping slots on the same date
    const overlappingSlots = await SlotModel.find({
      shop: shopId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      $or: [
        // New slot starts during existing slot
        {
          from: { $lte: from },
          to: { $gt: from },
        },
        // New slot ends during existing slot
        {
          from: { $lt: to },
          to: { $gte: to },
        },
        // Existing slot is completely inside new slot
        {
          from: { $gte: from },
          to: { $lte: to },
        },
      ],
    });

    if (overlappingSlots.length > 0) {
      return res.status(200).json({
        success: true,
        available: false,
        message: "Time slot is already booked",
        overlappingSlots: overlappingSlots,
      });
    }

    return res.status(200).json({
      success: true,
      available: true,
      message: "Time slot is available",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
// create slot (this happens in appointments route when user books)

// edit slot (when mechanic sets the duration on confirm)

// delete slot (this happens in appointments route when shopOwner rejects/ or user cancels)

export default router;
