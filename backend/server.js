import express from "express";
import cors from "cors";
import connectToCloudinary from "./database/cloudinary.js";
import createUserTable from "./models/userModel.js";
import createProductTable from "./models/productModel.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import createCartTable from "./models/CartModel.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectToCloudinary();

createUserTable();
createProductTable();
createCartTable();


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.use("/", (req, res) => {
  console.log(`Server is running on port: ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
