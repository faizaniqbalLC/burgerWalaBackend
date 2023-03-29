import { asyncError } from "../middleware/errorMiddleware.js";
import { Users } from "../models/Users.js";

export const myProfile = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid", {
      secure: process.env.NODE_ENV == "development" ? false : true,
      httpOnly: process.env.NODE_ENV == "development" ? false : true,
      sameSite: process.env.NODE_ENV == "development" ? false : "none",
    });
    res.status(200).json({
      message: "Logged out",
    });
  });
};
export const getAdminUsers = asyncError(async (req, res, next) => {
  const users = await Users.find({});
  res.status(200).json({ success: true, users });
});

export const getAdminStats = asyncError(async (req, res, next) => {
  const userCount = await Users.countDocuments();
  const orders = await Orders.find({});

  const preparingOrders = orders.filter((i) => i.orderStatus == "Preparing");
  const shippedOrders = orders.filter((i) => i.orderStatus == "Shipped");
  const deliveredOrders = orders.filter((i) => i.orderStatus == "Delivered");

  let totalIncome = 0;

  orders.forEach((i) => {
    totalIncome += i.totalAmount;
  });
  res.status(200).json({
    success: true,
    userCount,
    orderCount: {
      total: orders.length,
      preparing: preparingOrders.length,
      shipped: shippedOrders.length,
      delivered: deliveredOrders.length,
    },
  });
});
