import express from "express";
import connectToDB from "../database/database.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
      date,
    } = req.body;

    const files = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files[key] && req.files[key][0])
      .filter(Boolean);

    const imagesUrl = await Promise.all(
      files.map((f) =>
        cloudinary.uploader
          .upload(f.path, { resource_type: "image" })
          .then((r) => r.secure_url)
      )
    );

    const imagesString = imagesUrl.join(",");
    const sizesString = JSON.stringify(sizes);

    const sql = `
        INSERT INTO products
          (name, description, price, image, category, subCategory, sizes, bestSeller, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const params = [
      name,
      description,
      price,
      imagesString,
      category,
      subCategory,
      sizesString,
      bestSeller,
      date,
    ];

    connectToDB.run(sql, params, (error) => {
      if (error) {
        console.error("SQLite error:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
      res
        .status(200)
        .json({ success: true, message: "Product added successfully" });
    });
  } catch (err) {
    console.error("addProduct error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const listProducts = async (request, response) => {
  try {
    const sql = `SELECT * FROM products`;
    connectToDB.all(sql, [], (error, rows) => {
      if (error) {
        console.error("SQLITE error: ", error);
        return response
          .status(500)
          .json({ success: false, message: error.message });
      } else {
        return response.status(200).json({ success: true, products: rows });
      }
    });
  } catch (error) {
    console.error("listProducts error: ", error);
    response.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const sql = `DELETE FROM products WHERE id = ?`;
    const params = [id];

    connectToDB.run(sql, params, (error) => {
      if (error) {
        console.error("SQLite error: ", error);
        return response
          .status(500)
          .json({ success: false, message: error.message });
      } else {
        return response
          .status(200)
          .json({ success: true, message: "Product removed successfully" });
      }
    });
  } catch (error) {
    console.error("RemoveProduct error: ", error);
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

const singleProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const sql = `SELECT * FROM products WHERE id = ?`;
    const params = [id];

    connectToDB.get(sql, params, (error, row) => {
      if (error) {
        return response
          .status(500)
          .json({ success: false, message: error.message });
      } else {
        return response.status(200).json({ success: true, product: row });
      }
    });
  } catch (error) {
    console.log("SingleProduct error: ", error);
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
