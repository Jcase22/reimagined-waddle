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

    let filter = {};
    if (req.query.brand) {
      filter.brand = req.query.brand;
    }
    if (req.query.type) {
      filter.type = req.query.type;
    }

    const products = await Product.find(filter).skip(skip).limit(limit);

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

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

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "product not found" })
    }

    res.status(200).json({ message: "product found", product })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const addFavorite = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.params.userId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "product not found" })
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    // Check if the product is already in the user's favorites
    const isFavorite = user.favorites.some(fav => fav._id.toString() === productId);
    if (isFavorite) {
      return res.status(400).json({ message: "product already in favorites" })
    }

    user.favorites.push(product);
    await user.save();

    res.status(200).json({ message: "favorite added", favorites: user.favorites })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const getProductsByBrand = async (req, res) => {
  try {
    const brand = req.params.brand;

    const products = await Product.find({ brand });

    if (!products) {
      return res.status(404).json({ message: "no products found" });
    }

    res.status(200).json({ message: "products found", products });
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}