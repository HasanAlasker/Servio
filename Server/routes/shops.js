import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import ShopModel from "../models/shop.js";
import shopOwner from "../middleware/shopOwner.js";
import validate from "../middleware/joiValidation.js";
import { addShopSchema, editShopSchema } from "../validation/shop.js";
import UserModel from "../models/user.js";
import {
  deleteImageFromCloudinary,
  upload,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import { sendPushNotification } from "../utils/notifications.js";

const router = express.Router();

// get all verified shops
router.get("/verified", auth, async (req, res) => {
  try {
    const shops = await ShopModel.find({
      isVerified: true,
      isDeleted: false,
    })
      .sort("-createdAt")
      .populate("owner", "name email phone role");
    return res.status(200).json({ success: true, data: shops });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get all unverified shops
router.get("/un-verified", [auth, admin], async (req, res) => {
  try {
    const shops = await ShopModel.find({
      isVerified: false,
      isDeleted: false,
    })
      .sort("-createdAt")
      .populate("owner", "name email phone role");
    return res.status(200).json({ success: true, data: shops });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get my shop
router.get("/mine", [auth, shopOwner], async (req, res) => {
  try {
    const userId = req.user._id;

    const myShop = await ShopModel.find({
      owner: userId,
      isVerified: true,
      isDeleted: false,
    });
    if (!myShop)
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });

    return res.status(200).json({ success: true, data: myShop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get deleted shops
router.get("/deleted", [auth, admin], async (req, res) => {
  try {
    const shops = await ShopModel.find({ isDeleted: true });

    return res.status(200).json({ success: true, data: shops });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// get shop by id
router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop ID",
      });
    }

    const shop = await ShopModel.findById(id).populate(
      "owner",
      "name email phone role",
    );
    if (!shop)
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });

    return res.status(200).json({ success: true, data: shop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// open shop
router.post(
  "/openShop",
  upload.single("image"),
  [auth, validate(addShopSchema)],
  async (req, res) => {
    let uploadedImage = null;

    try {
      const data = req.body;
      data.owner = req.user._id;
      data.isVerified = false;

      if (req.file) {
        uploadedImage = await uploadToCloudinary(req.file.buffer);
        data.image = uploadedImage.secure_url;
        data.imagePublicId = uploadedImage.public_id;
      }

      const newShop = new ShopModel(data);
      await newShop.save();

      if (!newShop)
        return res
          .status(404)
          .json({ success: false, message: "Failed to create shop" });

      try {
        const admins = await UserModel.find({ role: "admin" });

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

        if (tokens.length > 0) {
          await sendPushNotification(
            tokens,
            `New Shop`,
            `Someone sent a shop opening request!`,
          );
          console.log("📤 Attempting to send notification to:", tokens);
        }
      } catch (notificationError) {
        console.error("Failed to send push notification:", notificationError);
      }

      return res.status(201).json({
        success: true,
        message: "Admins will review your request soon",
        data: newShop,
      });
    } catch (error) {
      // If post creation fails and image was uploaded, delete it from Cloudinary
      if (uploadedImage && uploadedImage.public_id) {
        await deleteImageFromCloudinary(uploadedImage.public_id);
      }
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Shop number already exists",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
);

// edit shop
router.patch(
  "/edit/:id",
  upload.single("image"),
  [auth, shopOwner, validate(editShopSchema)],
  async (req, res) => {
    let uploadedImage = null;

    try {
      const id = req.params.id;
      const data = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid shop ID",
        });
      }

      const shop = await ShopModel.findById(id);
      if (shop.owner.toString() !== req.user._id.toString())
        return res
          .status(403)
          .json({ success: false, message: "You can only update your shop" });

      if (req.file) {
        uploadedImage = await uploadToCloudinary(req.file.buffer);
        data.image = uploadedImage.secure_url;
        data.imagePublicId = uploadedImage.public_id;
      }

      const updatedShop = await ShopModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      if (!updatedShop)
        return res
          .status(404)
          .json({ success: false, message: "Failed to update shop" });

      return res.status(200).json({ success: true, data: updatedShop });
    } catch (error) {
      // If post creation fails and image was uploaded, delete it from Cloudinary
      if (uploadedImage && uploadedImage.public_id) {
        await deleteImageFromCloudinary(uploadedImage.public_id);
      }
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Shop number already exists",
        });
      }
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
);

// delete shop
router.patch("/delete/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop ID",
      });
    }

    const deletedShop = await ShopModel.findByIdAndUpdate(
      id,
      { isDeleted: true, isVerified: false },
      {
        runValidators: true,
        new: true,
      },
    );

    if (!deletedShop)
      return res
        .status(404)
        .json({ success: false, message: "Failed to delete shop" });

    try {
      const shopOwner = await UserModel.findById(deletedShop.owner._id);

      if (
        shopOwner &&
        shopOwner.pushNotificationTokens &&
        shopOwner.pushNotificationTokens.length > 0
      ) {
        const tokens = shopOwner.pushNotificationTokens.map(
          (tokenObj) => tokenObj.token,
        );

        await sendPushNotification(
          tokens,
          `Shop Deleted`,
          `Servio team has deleted your shop for a policy violation!`,
        );
        console.log("📤 Attempting to send notification to:", tokens);
      }
    } catch (notificationError) {
      console.error("Failed to send push notification:", notificationError);
    }

    return res.status(200).json({ success: true, data: deletedShop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// undelete and verify shop
router.patch("/un-delete/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop ID",
      });
    }

    const deletedShop = await ShopModel.findByIdAndUpdate(
      id,
      { isDeleted: false, isVerified: true },
      {
        runValidators: true,
        new: true,
      },
    );

    if (!deletedShop)
      return res
        .status(404)
        .json({ success: false, message: "Failed to un-delete shop" });

    try {
      const shopOwner = await UserModel.findById(deletedShop.owner._id);

      if (
        shopOwner &&
        shopOwner.pushNotificationTokens &&
        shopOwner.pushNotificationTokens.length > 0
      ) {
        const tokens = shopOwner.pushNotificationTokens.map(
          (tokenObj) => tokenObj.token,
        );

        await sendPushNotification(
          tokens,
          `Shop Restored`,
          `Servio team has restored your shop for after investigation!`,
        );
        console.log("📤 Attempting to send notification to:", tokens);
      }
    } catch (notificationError) {
      console.error("Failed to send push notification:", notificationError);
    }

    return res.status(200).json({ success: true, data: deletedShop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// verify shop & make user shopOwner
router.patch("/verify/:id", [auth, admin], async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid shop ID",
      });
    }

    const shop = await ShopModel.findById(id);
    if (!shop)
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });

    await UserModel.findByIdAndUpdate(
      shop.owner,
      {
        role: "shopOwner",
      },
      { runValidators: true, new: true },
    );

    const verifiedShop = await ShopModel.findByIdAndUpdate(
      id,
      { isVerified: true },
      {
        runValidators: true,
        new: true,
      },
    );

    if (!verifiedShop)
      return res
        .status(404)
        .json({ success: false, message: "Failed to verify shop" });

    try {
      const shopOwner = await UserModel.findById(shop.owner._id);

      if (
        shopOwner &&
        shopOwner.pushNotificationTokens &&
        shopOwner.pushNotificationTokens.length > 0
      ) {
        const tokens = shopOwner.pushNotificationTokens.map(
          (tokenObj) => tokenObj.token,
        );

        await sendPushNotification(
          tokens,
          `Shop Request Confirmed`,
          `Servio team has reviewed and confirmed your shop opening request!`,
        );
        console.log("📤 Attempting to send notification to:", tokens);
      }
    } catch (notificationError) {
      console.error("Failed to send push notification:", notificationError);
    }

    return res.status(200).json({ success: true, data: verifiedShop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// rate shop

export default router;
