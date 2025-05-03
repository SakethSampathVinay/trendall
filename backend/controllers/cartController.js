import express from "express";
import connectToDB from "../database/database.js";

const addToCart = (request, response) => {
  try {
    const { userId, productId } = request.body;

    connectToDB.get(
      `SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?`,
      [userId, productId],
      (error, row) => {
        if (error)
          return response
            .status(500)
            .json({ success: false, message: "DB ERROR" });

        if (row) {
          const newQuantity = row.quantity + 1;
          connectToDB.run(
            `UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?`,
            [newQuantity, userId, productId],
            (error) => {
              if (error)
                return response
                  .status(500)
                  .json({ success: false, message: "Update failed" });
              response.json({ success: true, message: "Cart Updated" });
            }
          );
        } else {
          connectToDB.run(
            `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)`,
            [userId, productId],
            (error) => {
              if (error)
                return response
                  .status(500)
                  .json({ success: false, message: "Insert failed" });
              response
                .status(200)
                .json({ success: true, message: "Added to Cart" });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("Error Adding to Cart: ", error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getCart = (request, response) => {
  try {
    const userId = request.params.userId;

    const query = `
        SELECT cart.product_id, cart.quantity, products.name, products.price, products.image
        FROM cart
        JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    connectToDB.all(query, [userId], (error, rows) => {
      if (error)
        return response
          .status(500)
          .json({ success: false, message: "Fetch failed" });
      response.json({ success: true, cartItems: rows });
    });
  } catch (error) {
    console.log("Error Getting Cart Items", error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const removeFromCart = (request, response) => {
  try {
    const { userId, productId } = request.body;

    connectToDB.run(
      `DELETE FROM cart WHERE user_id = ? AND product_id = ?`,
      [userId, productId],
      (error) => {
        if (error)
          return response
            .status(500)
            .json({ success: false, message: "Delete failed" });
        response
          .status(200)
          .json({ success: true, message: "Item removed from cart" });
      }
    );
  } catch (error) {
    console.log("Error Deleting the Item", error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateCartQuantity = (request, response) => {
  try {
    const { userId, productId, quantity } = request.body;

    connectToDB.run(
      `UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?`,
      [quantity, userId, productId],
      (error) => {
        if (error)
          return response
            .status(500)
            .json({ success: false, message: "Update failed" });
        response
          .status(200)
          .json({ success: true, message: "Quantity updated" });
      }
    );
  } catch (error) {
    console.log("Error updating the cart", error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addToCart, getCart, removeFromCart, updateCartQuantity };
