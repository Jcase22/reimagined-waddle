import Product from "../models/Product.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total / limit);

    if (!products) {
      return res.status(404).json({ message: "no products found" });
    }

    res.status(200).json({ message: "products found", products, totalPages, page });
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const getFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    res.status(200).json({ message: "user found", favorites: user.favorites })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    for (let i = 0; i < user.favorites.length; i++) {
      if (user.favorites[i]._id.toString() === productId) {
        user.favorites.splice(i, 1);
        break;
      }
    }
    await user.save();

    res.status(200).json({ message: "favorite removed", favorites: user.favorites })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}