import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

export default db;
