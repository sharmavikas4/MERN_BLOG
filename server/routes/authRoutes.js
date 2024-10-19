import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  logout,
} from "../controller/authController.js";
import { isAuthenticated, isAdmin, isEditor } from "../middleware/auth.js"; 

const router = express.Router();

// Google OAuth routes
router.route("/auth/google").get(googleAuth);
router.route("/auth/google/test").get(googleAuthCallback);
router.route("/logout").get(logout);

//Admin-only route
router.route("/admin").get(isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

//Editor-only route
router.route("/editor").get(isEditor, (req, res) => {
  res.json({ message: "Welcome Editor" });
});

export default router;
