import express from "express";
import connectToDB from "../database/database.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginUser = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  if (password.length < 8) {
    return response.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const params = [email];

    connectToDB.get(sql, params, async (error, user) => {
      if (error) {
        return response
          .status(500)
          .json({ success: false, message: error.message });
      }
      if (!user) {
        return response
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return response
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      if (token) {
        return response.status(200).json({
          success: true,
          message: "Login successfully",
          token,
          user: { id: user.id, name: user.name, email: user.email },
        });
      }
    });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

const registerUser = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  if (password.length < 8) {
    return response.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const salt = 10;
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = { name, email, password: hashedPassword };

    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const params = [user.name, user.email, user.password];

    connectToDB.run(sql, params, function (error) {
      if (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
          return response
            .status(400)
            .json({ success: false, message: "User already exists" });
        } else {
          return response
            .status(500)
            .json({ success: false, message: error.message });
        }
      }

      // ✅ Get inserted user ID from `this.lastID`
      const insertedUserId = this.lastID;

      const token = jwt.sign(
        { id: insertedUserId, email: user.email },
        process.env.JWT_SECRET || "dev_secret_key",
        { expiresIn: "1h" }
      );

      return response.status(201).json({
        success: true,
        message: "User created successfully",
        token,
        user: { id: insertedUserId, name: user.name, email: user.email },
      });
    });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

const adminLogin = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  if (password.length < 8) {
    return response.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return response
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: 1, email: email, role: "admin" },
    process.env.JWT_SECRET
  );

  if (token) {
    return response
      .status(200)
      .json({ success: true, message: "Login successfully", token });
  } else {
    return response
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};


export { loginUser, registerUser, adminLogin };
