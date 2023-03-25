import { asyncError } from "../middleware/errorMiddleware.js";
import { Order } from "../models/Order.js";

export const placeOrder = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;
  const user = "req.user._id";
  const orderOptions = {
    user,
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  };
  await Order.create(orderOptions);
  res.status(200).json({
    success: true,
    message: "Order placed successfully via Cash on Delivery",
  });
});
