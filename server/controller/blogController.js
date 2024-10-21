import USER from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      image: uploadResult.secure_url, // Use secure_url from Cloudinary
      date: Date.now(),
      public_id: uploadResult.public_id,
    };

    const foundUser = await USER.findById(req.user.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    foundUser.post.push(newPost);
    await foundUser.save();
    
    res.json({ message: true });
  } catch (err) {
    console.error("Error creating blog post:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Fetch all blogs
const getBlogs = async (req, res) => {
  try {
    const foundUsers = await USER.find();
    if (!foundUsers) {
      return res.status(404).json({ message: false, error: "No users found" });
    }

    res.json({ message: true, users: foundUsers, img: req.user.image });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Like a blog post
const likeBlog = async (req, res) => {
  try {
    const foundUser = await USER.findById(req.body.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const postIndex = foundUser.post.findIndex((p) => p._id == req.body._id);
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = foundUser.post[postIndex];
    const likeIndex = post.like.likedBy.findIndex((u) => u.user == req.user._id);

    if (likeIndex !== -1) {
      post.like.likedBy.splice(likeIndex, 1);
      post.like.n -= 1;
    } else {
      post.like.likedBy.push({ user: req.user._id, date: Date.now() });
      post.like.n += 1;
    }

    await foundUser.save();
    res.json({ message: true, liked: likeIndex === -1 });
  } catch (err) {
    console.error("Error liking blog post:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Add a comment to a blog post
const commentBlog = async (req, res) => {
  try {
    const foundUser = await USER.findById(req.body.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const postIndex = foundUser.post.findIndex((p) => p._id == req.body._id);
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      comment: req.body.comment,
      user: req.user.name,
      image: req.user.image,
    };

    foundUser.post[postIndex].comments.push(newComment);
    await foundUser.save();

    res.json({ message: true, user: req.user.name, image: req.user.image });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Fetch trending blogs
const trendingBlogs = async (req, res) => {
  try {
    const foundUsers = await USER.find();
    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    let posts = foundUsers.flatMap((user) => 
      user.post.map((p) => ({ name: user.name, post: p, image: user.image, id: user.id }))
    );

    posts.sort((a, b) => b.post.like.n - a.post.like.n);
    res.json({ posts, image: req.user.image });
  } catch (err) {
    console.error("Error fetching trending blogs:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Fetch new blogs
const newBlogs = async (req, res) => {
  try {
    const foundUsers = await USER.find();
    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    let posts = foundUsers.flatMap((user) => 
      user.post.map((p) => ({ name: user.name, post: p, image: user.image, id: user.id }))
    );

    posts.sort((a, b) => b.post.date - a.post.date);
    res.json({ posts, image: req.user.image });
  } catch (err) {
    console.error("Error fetching new blogs:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Edit a blog
const editBlog = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  let image = req.file ? req.file.path : "";

  try {
    const foundUser = await USER.findById(req.body.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const postIndex = foundUser.post.findIndex((p) => p._id.toString() === req.body.pid);
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingPost = foundUser.post[postIndex];

    // Handle image update logic
    if (image) {
      if (existingPost.public_id) {
        await deleteImageFromCloudinary(existingPost.public_id);
      }
      const uploadResult = await cloudinary.uploader.upload(image); // Upload new image to Cloudinary
      foundUser.post[postIndex].image = uploadResult.secure_url; // Use secure_url from Cloudinary
      foundUser.post[postIndex].public_id = uploadResult.public_id; // Save new public_id
    } else {
      foundUser.post[postIndex].image = existingPost.image; // Keep existing image if no new image is provided
    }

    foundUser.post[postIndex].title = title;
    foundUser.post[postIndex].content = content;

    await foundUser.save();
    res.json({ message: true });
  } catch (err) {
    console.error("Error editing blog:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Function to delete image from Cloudinary
const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted:", result);
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
    throw new Error("Image deletion failed");
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const foundUser = await USER.findById(req.body.id).select("post");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const postToDelete = foundUser.post.find((p) => p._id.toString() === req.body.pid);
    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found" });
    }

    foundUser.post = foundUser.post.filter((p) => p._id.toString() !== req.body.pid);

    if (postToDelete.public_id) {
      await cloudinary.uploader.destroy(postToDelete.public_id);
      console.log(`Deleted image with public_id: ${postToDelete.public_id}`);
    } else {
      console.warn("Post has no public_id, skipping Cloudinary deletion.");
    }

    await foundUser.save();
    res.json({ message: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Check like status
const checkLikeStatus = async (req, res) => {
  try {
    const foundUser = await USER.findById(req.body.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const postIndex = foundUser.post.findIndex((p) => p._id == req.body.pid);
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = foundUser.post[postIndex].like.likedBy.some((l) => l.user == req.user._id);

    res.json({
      message: true,
      liked: isLiked,
      likeCount: foundUser.post[postIndex].like.n,
      comments: foundUser.post[postIndex].comments,
    });
  } catch (err) {
    console.error("Error checking like status:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Fetch a particular blog by id
const getBlogById = async (req, res) => {
  try {
    const foundUser = await USER.findOne({ "post._id": req.body.id }, { "post.$": 1 });
    if (!foundUser || foundUser.post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = {
      name: foundUser.name,
      post: foundUser.post[0],
    };

    res.json({ post });
  } catch (err) {
    console.error("Error fetching blog by ID:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

export {
  checkLikeStatus,
  commentBlog,
  createBlog,
  editBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  likeBlog,
  newBlogs,
  trendingBlogs,
};
