import Product from "../models/Product.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

export const tokenCheck = async (req, res) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.json({ message: "No token available, user is not logged in", isValid: false })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    res.status(200).json({ message: "token is valid", isValid: true })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}



export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    res.status(200).json({ message: "user found", user })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const signup = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    //look for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" })
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save user
    const newUser = User.create({ username, email, password: hashedPassword, todos: [] })

    res.status(200).json({ message: "user created successfully" })
  } catch (error) {
    console.log(error)
    res.status(501).json({ message: "server error: ", error })
  }
}

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" })
    }

    const token = generateToken(user._id);

    res.cookie("token", token)

    res.status(200).json({ message: "login successful", token, _id: user._id, role: user.role })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("token", "")
    res.json({ message: "Logged out successfully" })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const roleCheck = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    const isAdmin = user.role === 'admin';
    const isUser = user.role === 'user';

    res.status(200).json({ message: "user found", isAdmin, isUser })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate({ path: 'favorites', model: 'Product' });

    res.status(200).json({ message: "users found", users })
  } catch (error) {
    res.status(500).json({ message: "server error", error })
  }
}