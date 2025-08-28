// db.js:          # database connection logic

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Err: ${err.message}`);
    process.exit(1); // 1 for failure and 0 for success
  }
};
