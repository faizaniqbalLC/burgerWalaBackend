import { asyncError } from "../middleware/errorMiddleware.js";
import { Order } from "../models/Order.js";
import ErrorHandler from "../utils/ErrorHandler.js";

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

  const user = req.user._id;

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully via Cash On Delivery",
  });
});

export const getMyOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name "
  );

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrderDetails = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) {
    return next(new ErrorHandler("Invalid Order Id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

export const getAdminOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name ");

  res.status(200).json({
    success: true,
    orders,
  });
});
export const processOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Invalid Order Id", 404));
  }
  if (order.orderStatus == "Preparing") order.orderStatus = "Shipped";
  if (order.orderStatus == "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Food Already Delivered", 400));
  }
  await order.save();
  res.status(200).json({
    success: true,
    message: "Status Updated Successfully!",
  });
});
