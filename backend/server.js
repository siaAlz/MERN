import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoute from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoute);

const startServer = async () => {
  // Doing it this way is better because no one can hit your endpoints before db connected
  // eg: going to /products before db is connected

  await connectDB(); //wait for DB before starting server
  app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
  });
};

startServer();
