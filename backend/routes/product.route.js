import express from "express";
const route = express.Router();
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

route.get("/", getProducts);
route.post("/", createProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

export default route;
