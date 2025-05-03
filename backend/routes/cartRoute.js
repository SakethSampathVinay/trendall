import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/cart/add", addToCart);
cartRouter.get("/cart/:userId", getCart);
cartRouter.post("/cart/remove", removeFromCart);
cartRouter.post("/cart/updae-quantity", updateCartQuantity);

export default cartRouter;
