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
    res.clearCookie("connect.sid");
    res.status(200).json({
      message: "Logged out",
    });
  });
};

export const getAdminUsers = asyncError(async (req, res, next) => {
  const users = await Users.find({});
  res.status(200).json({ success: true, users });
});
