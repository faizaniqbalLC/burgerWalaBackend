import mongoose from "mongoose";

export const connectDb = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URL);
  console.log("db conncted");
};
