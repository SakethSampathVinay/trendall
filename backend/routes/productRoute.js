import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/authAdmin.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  authMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", authMiddleware, listProducts);
productRouter.delete("/remove/:id", authMiddleware, removeProduct);
productRouter.get("/single/:id", authMiddleware, singleProduct);

export default productRouter;
