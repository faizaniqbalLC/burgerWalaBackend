import express from "express";
import passport from "passport";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: "https://burger-wala-frontend-six.netlify.app",
  })
);

router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);

// admin routes
router.get("/admin/user", isAuthenticated, authorizeAdmin, getAdminUsers);
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);
export default router;
