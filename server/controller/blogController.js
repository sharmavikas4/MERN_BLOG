import USER from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
// Create a new blog post
const createBlog = async (req, res) => {
  try {
    let imageData = null;

    // Handle image upload if file exists
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageData = {
          path: req.file.path,
          public_id: result.public_id
        };
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(400).json({ 
          message: false, 
          error: "Image upload failed" 
        });
      }
    }

    // Create new post object with conditional image data
    const newpost = {
      title: req.body.title,
      content: req.body.content,
      date: Date.now(),
      ...(imageData && {
        image: imageData.path,
        public_id: imageData.public_id
      })
    };

    // Find and update user
    const foundUser = await USER.findById(req.user.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    foundUser.post.push(newpost);
    await foundUser.save();
    
    return res.json({ 
      message: true,
      post: newpost
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      message: false, 
      error: error.message 
    });
  }
};

// app.get("/success/like",function(req,res){
//   if (req.isAuthenticated()){
//     res.json(({message: "vikas"}))
//   }
// });

// Fetch all blogs
const getBlogs = async (req, res) => {
  try {
    const foundUsers = await USER.find();
    if (foundUsers) {
      res.json({ message: true, user: foundUsers, img: req.user.image });
    } else {
      res.status(404).json({ message: false, error: "Users not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

// Like a blog post
const likeBlog = async (req, res) => {
  try {
    // Find the user by blog ID
    const foundUser = await USER.findById(req.body.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the post to like
    let ind = foundUser.post.findIndex((p) => p._id == req.body._id);
    if (ind === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    let n = -1;
    let post = foundUser.post[ind];

    // Check if the user already liked the post
    const likeIndex = post.like.likedBy.findIndex(
      (u) => u.user == req.user._id
    );
    if (likeIndex !== -1) {
      // Unlike the post if already liked
      post.like.likedBy = post.like.likedBy.filter(
        (u) => u.user != req.user._id
      );
      post.like.n -= 1;
      n = likeIndex;
    } else {
      // Like the post if not already liked
      post.like.likedBy.push({ user: req.user._id, date: Date.now() });
      post.like.n += 1;
    }

    // Save the updated user document
    await foundUser.save();

    // Respond with success and like status
    res.json({ message: true, n });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
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

    let newComment = {
      comment: req.body.comment,
      user: req.user.name,
      image: req.user.image,
    };

    foundUser.post[postIndex].comments.push(newComment);

    await foundUser.save();

    res.json({ user: req.user.name, image: req.user.image });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// Fetch trending blogs
const trendingBlogs = async (req, res) => {
  try {
    let post = [];
    const foundUsers = await USER.find();

    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    foundUsers.forEach((user) => {
      user.post.forEach((p) => {
        const newpost = {
          name: user.name,
          post: p,
          image: user.image,
          id: user.id,
        };
        post.push({ ...newpost });
      });
    });

    // Sort the posts by likes
    post.sort((a, b) => b.post.like.n - a.post.like.n);

    res.json({ post, image: req.user.image });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// Fetch new blogs
const newBlogs = async (req, res) => {
  try {
    let post = [];
    const foundUsers = await USER.find();

    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    foundUsers.forEach((user) => {
      user.post.forEach((p) => {
        const newpost = {
          name: user.name,
          post: p,
          image: user.image,
          id: user.id,
        };
        post.push({ ...newpost });
      });
    });

    // Sort the posts by date (newest first)
    post.sort((a, b) => b.post.date - a.post.date);

    res.json({ post, image: req.user.image });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
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

    const postIndex = foundUser.post.findIndex(
      (p) => p._id.toString() === req.body.pid
    );

    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingPost = foundUser.post[postIndex];

    // Handle image update logic
    if (image) {
      // Only delete the old image if there is a new image
      if (existingPost.public_id) {
        await deleteImageFromCloudinary(existingPost.public_id);
      }
      // Set new image path and public_id from Cloudinary after upload
      foundUser.post[postIndex].image = image;
      // You might need to upload the new image to Cloudinary and get its public_id
      // foundUser.post[postIndex].public_id = newPublicId;
    } else {
      // If no new image, retain existing image
      foundUser.post[postIndex].image = existingPost.image;
    }

    // Update post details
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
    // Find user by ID and populate posts
    const foundUser = await USER.findById(req.body.id).select("post");

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the post to delete
    const postToDelete = foundUser.post.find(
      (p) => p._id.toString() === req.body.pid
    );

    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove the post from the user's posts
    foundUser.post = foundUser.post.filter(
      (p) => p._id.toString() !== req.body.pid
    );

    // If the post has a public_id, attempt to delete from Cloudinary
    if (postToDelete.public_id) {
      await cloudinary.uploader.destroy(postToDelete.public_id);
      console.log(`Deleted image with public_id: ${postToDelete.public_id}`);
    } else {
      console.warn("Post has no public_id, skipping Cloudinary deletion.");
    }

    // Save the updated user
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
    const foundUser = await USER.findById({ _id: req.body.id });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let ind = -1;
    foundUser.post.forEach((p, i) => {
      console.log("p._id:", p._id, "post:", req.body.pid);
      if (p._id == req.body.pid) {
        ind = i;
      }
    });

    if (ind === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    let n = -1;
    foundUser.post[ind].like.likedBy.forEach((l) => {
      if (l.user == req.user._id) {
        n = 1;
      }
    });

    res.json({
      message: n === 1,
      like: foundUser.post[ind].like.n,
      comment: foundUser.post[ind].comments,
    });
  } catch (err) {
    console.error("Error in checkLikeStatus:", err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Fetch a particular blog by id
const getBlogById = (req, res) => {
  let post = {};
  const id = req.body.id;
  console.log(id);
  USER.findOne({ "post._id": id }, { "post.$": 1 }).then((foundUser) => {
    if (foundUser && foundUser.post.length != 0) {
      USER.findById({ _id: foundUser._id })
        .then((found) => {
          if (found) {
            post = {
              name: found.name,
              post: foundUser.post[0],
            };
            res.json({ post });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });
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
