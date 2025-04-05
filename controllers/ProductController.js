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

    if (!products) {
      return res.status(404).json({ message: "no products found" });
    }

    res.status(200).json({ message: "products found", products });
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}