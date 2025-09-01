import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ message: "success", data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};
const createProduct = async (req, res) => {
  const product = req.body; // User will send this data
  if (!product.name || !product.price || !product.image)
    return res
      .status(400) // 400: Bad request from the client
      .json({ success: false, message: "Please provide all fields." });

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error("Error in Creating product"), err.message;
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) return res.status(404).json("Product was not found");

    res
      .status(200)
      .json({
        success: true,
        data: updatedProduct,
        message: "Product updated successfully",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(400)
      .json({ success: false, message: "Invalid product Id" });
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product was not found" });
    res.status(200).json({ success: true, message: "Product deleted" }); // 204: No Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
