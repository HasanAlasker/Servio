import express from "express";
import mongoose from "mongoose";
import SuggestionModel from "../models/suggestion.js";
import { sendPushNotification } from "../utils/notifications.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// get all suggestions (admin)
router.get("/all", [auth, admin], async (req, res) => {
  try {
    const suggestions = await SuggestionModel.find()
      .sort("-createdAt")
      .populate("user", "name email phone role");

    return res.status(200).json({ success: true, data: suggestions });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create suggesion
router.post("/add", auth, async (req, res) => {
  try {
    const data = req.body;
    data.user = req.user._id;

    const suggestion = new SuggestionModel(data);
    await suggestion.save();

    if (!suggestion)
      return res
        .status(400)
        .json({ success: false, message: "Failed to send suggestion" });

    try {
      const admins = await UserModel.find({ role: "admin" });
      const suggester = await UserModel.findById(req.user);

      const tokens = [];
      admins.forEach((admin) => {
        if (
          admin.pushNotificationTokens &&
          admin.pushNotificationTokens.length > 0
        ) {
          admin.pushNotificationTokens.forEach((tokenObj) => {
            tokens.push(tokenObj.token);
          });
        }
      });

      // Send notification if we have tokens
      if (tokens.length > 0) {
        await sendPushNotification(
          tokens,
          "New Suggestion",
          `${suggester.name} made a suggestion or gave feedback!`
        );
        console.log("📤 Notification sent to", tokens.length, "admin(s)");
      } else {
        console.log("⚠️ No admin tokens found");
      }
    } catch (notificationError) {
      console.error("Failed to send push notification:", notificationError);
    }

    res.status(201).send("Suggestion submitted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// delete suggestion (admin)
router.delete("/delete/:id", [auth, admin], async (req, res) => {
  try {
    const suggestionId = req.params.id;

    if (!suggestionId || !mongoose.Types.ObjectId.isValid(suggestionId)) {
      return res.status(400).send("Invalid suggestion ID");
    }

    const deletedSuggestion = await SuggestionModel.findByIdAndDelete(
      suggestionId
    );
    if (!deletedSuggestion) return res.status(400).send("Suggestion not found");

    res.status(200).send("Suggestion deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
