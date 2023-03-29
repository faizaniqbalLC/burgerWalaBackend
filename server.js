import app from "./app.js";
import Razorpay from "razorpay";

import { connectDb } from "./config/database.js";
connectDb();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get("/", (req, res, next) => {
  res.send("<h1>working fine</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server run.", process.env.NODE_ENV);
});
