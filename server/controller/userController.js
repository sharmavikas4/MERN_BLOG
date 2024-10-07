import USER from "../models/userModel.js";

// Fetch current user data
const getDashboard = (req, res) => {
  res.json({ user: req.user });
};

// Fetch posts liked by the current user
const getLikedPosts = (req, res) => {
  let post = [];
  USER.find().then((foundUser) => {
    if (foundUser) {
      foundUser.map((user) => {
        return user.post.map((p) => {
          return p.like.likedBy.map((l) => {
            if (l.user === req.user.id) {
              const newpost = {
                name: user.name,
                post: p,
                image: user.image,
                id: user.id,
              };
              post.push({ ...newpost });
              return post;
            }
          });
        });
      });
      post.sort((a, b) => b.post.date - a.post.date);
      res.json({
        post,
        image: req.user.image,
        name: req.user.name,
        id: req.user.id,
      });
    }
  });
};

export { getDashboard, getLikedPosts };
