import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// DB & Cloudinary
connectDB();
connectCloudinary();

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);



app.get("/", (req, res) => {
  res.status(200).send("Backend is running 🚀");
});



// Server start
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(" Stripe Key Loaded:", !!process.env.STRIPE_SECRET_KEY);
});
