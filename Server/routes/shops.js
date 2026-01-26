import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import ShopModel from "../models/shop.js";
import shopOwner from "../middleware/shopOwner.js";
import validate from "../middleware/joiValidation.js";
import { addShopSchema, editShopSchema } from "../validation/shop.js";
import UserModel from "../models/user.js";

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
router.post("/openShop", [auth, validate(addShopSchema)], async (req, res) => {
  try {
    const data = req.body;
    data.owner = req.user._id;
    data.isVerified = false;

    const newShop = new ShopModel(data);
    newShop.save();

    if (!newShop)
      return res
        .status(404)
        .json({ success: false, message: "Failed to create shop" });

    return res.status(201).json({
      success: true,
      message: "Admins will review your request soon",
      data: newShop,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// edit shop
router.patch(
  "/edit/:id",
  [auth, shopOwner, validate(editShopSchema)],
  async (req, res) => {
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
