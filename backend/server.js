import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


app.use(
  cors({
    origin: true,
    credentials: true,
  })
); 


connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/user',userRouter);
app.use('api/product',productRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
