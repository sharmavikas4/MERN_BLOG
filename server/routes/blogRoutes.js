import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";
import {
  createBlog,
  getBlogs,
  likeBlog,
  commentBlog,
  trendingBlogs,
  newBlogs,
  editBlog,
  deleteBlog,
  checkLikeStatus,
  getBlogById,
} from "../controller/blogController.js";

const router = express.Router();

// Blog routes
router
  .route("/success")
  .post(upload, isAuthenticated, createBlog)
  .get(isAuthenticated, getBlogs);
router.route("/success/like").post(isAuthenticated, likeBlog);
router.route("/success/comment").post(isAuthenticated, commentBlog);
router.route("/trending").get(isAuthenticated, trendingBlogs);
router.route("/new").get(isAuthenticated, newBlogs);
router.route("/edit").post(upload, isAuthenticated, editBlog);
router.route("/del").post(isAuthenticated, deleteBlog);
router.route("/success/check").post(isAuthenticated, checkLikeStatus);
router.route("/blog").post(isAuthenticated, getBlogById);

export default router;
