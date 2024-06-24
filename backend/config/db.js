import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
