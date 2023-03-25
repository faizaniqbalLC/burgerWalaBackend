import express from "express";
import { placeOrder } from "../controllers/order.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/createorder", placeOrder);
export default router;
