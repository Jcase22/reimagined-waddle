import mongoose from 'mongoose';
import dotenv from 'dotenv';
// require('dotenv').config()
dotenv.config()

console.log('hello', process.env.MONGO_URI)

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

export default db;
