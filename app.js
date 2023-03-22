import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import { connectPassport } from "./utils/Provider.js";

const app = express();

export default app;

dotenv.config({
  path: "./config/config.env",
});
connectPassport();

app.use("/api/v1", userRouter);
