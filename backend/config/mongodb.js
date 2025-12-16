import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
  } catch (error) {
    console.error("MongoDB Error:", error);
    process.exit(1);
  }
};

export default connectDB;
