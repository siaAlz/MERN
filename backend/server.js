import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoute from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoute);

// handle 404 for api routes
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Configuration for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  // Doing it this way is better because no one can hit your endpoints before db connected
  // eg: going to /products before db is connected

  await connectDB(); //wait for DB before starting server
  app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
  });
};

startServer();
