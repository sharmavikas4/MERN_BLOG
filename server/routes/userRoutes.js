import express from "express";
import { getDashboard, getLikedPosts } from "../controller/userController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

// User-specific routes
router.route("/dashboard").get(isAuthenticated, getDashboard);
router.route("/likedPost").get(isAuthenticated, getLikedPosts);

export default router;
