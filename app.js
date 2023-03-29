import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();
export default app;
// dotenv.config({
//   path: "./config/config.env",
// });

dotenv.config();

// Using Middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == "development" ? false : true,
      httpOnly: process.env.NODE_ENV == "development" ? false : true,
      sameSite: process.env.NODE_ENV == "development" ? false : "none",
    },
  })
);
app.use(cookieParser());

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

// Importing Routes
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

// Using Error Middleware
app.use(errorMiddleware);
