import { Router } from "express";

const user = Router();

user.get("/dashboard", function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.json({ user: req.user });
  }
});

user.get("/likedPost", function (req, res) {
  if (req.isAuthenticated()) {
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
  }
});

user.route("/logout").get(function (req, res) {
  req.logout(function (err) {
    console.log(err);
  });
  res.json({ message: false });
});

export default user;
