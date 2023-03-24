import express from "express";
import passport from "passport";
import { logout, myProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
router.get("/login", passport.authenticate("google"), (req, res, next) => {
  res.send("LOGGED IN");
});

router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);
export default router;
