import express, { urlencoded } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";

import { connectPassport } from "./utils/Provider.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";

const app = express();

export default app;

dotenv.config({
  path: "./config/config.env",
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();

// routes 1
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use(errorMiddleware);
