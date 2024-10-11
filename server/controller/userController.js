import USER from "../models/userModel.js";

// Fetch current user data
const getDashboard = (req, res) => {
  res.json({ user: req.user });
};

// Fetch posts liked by the current user
const getLikedPosts = async (req, res) => {
  try {
    const foundUsers = await USER.find();
    
    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    const likedPosts = foundUsers.flatMap((user) =>
      user.post
        .filter((post) => post.like.likedBy.some((like) => like.user === req.user.id))
        .map((post) => ({
          name: user.name,
          post: post,
          image: user.image,
          id: user.id,
        }))
    );

    likedPosts.sort((a, b) => b.post.date - a.post.date); // Sort posts by date

    res.json({
      post: likedPosts,
      image: req.user.image,
      name: req.user.name,
      id: req.user.id,
    });
  } catch (err) {
    console.error("Error fetching liked posts:", err);
    res.status(500).json({ message: false, error: err.message });
  }
};

export { getDashboard, getLikedPosts };
