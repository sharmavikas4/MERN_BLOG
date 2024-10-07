import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  logout,
} from "../controller/authController.js";

const router = express.Router();

// Google OAuth routes
router.route("/auth/google").get(googleAuth);
router.route("/auth/google/test").get(googleAuthCallback);
router.route("/logout").get(logout);

export default router;
