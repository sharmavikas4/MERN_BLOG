import { Router } from "express";
import upload from "../config/cloudinary.js";

const blog = Router();

blog.get("/success", function (req, res) {
  if (req.isAuthenticated()) {
    USER.find().then((foundUsers) => {
      if (foundUsers) {
        res.json({ message: true, user: foundUsers, img: req.user.image });
      }
    });
  } else {
    res.json({ message: false });
  }
});
blog.post("/success", upload.single("image"), async function (req, res) {
  if (req.isAuthenticated()) {
    console.log(req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path);
    const newpost = {
      title: req.body.title,
      content: req.body.content,
      image: req.file.path,
      date: Date.now(),
      public_id: result.public_id,
    };

    console.log(result.public_id);
    // USER.findOneAndUpdate(
    //   { email: req.user.email }, // Update condition
    //   { $set: { img: req.file.path } } // New field and value
    // )
    //   .then(() => {
    //     console.log("Added successfully");
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    USER.findById(req.user.id).then((foundUser) => {
      if (foundUser) {
        foundUser.post.push(newpost);
        foundUser
          .save()
          .then(() => {
            res.json({ message: true });
          })
          .catch((err) => {
            res.json({ message: false });
          });
      }
    });
  }
});

// blog.get("/success/like",function(req,res){
//   if (req.isAuthenticated()){
//     res.json(({message: "vikas"}))
//   }
// });

blog.post("/success/like", function (req, res) {
  if (req.isAuthenticated()) {
    let ind = 0;
    USER.findById({ _id: req.body.id })
      .then((foundUser) => {
        foundUser.post.filter((p, i) => {
          if (p._id == req.body._id) {
            ind = i;
          }
        });
        var n = -1;
        if (foundUser.post[ind].like.likedBy.length === 0) {
          n = -1;
        } else {
          if (foundUser) {
            const index = foundUser.post[ind].like.likedBy.findIndex((u, i) => {
              if (req.user._id == u.user) {
                return true;
              }
            });
            n = index;
          }
        }
        let a = 0;
        if (n != -1) {
          a = -1;
        } else {
          a = 1;
        }
        foundUser.post[ind].like.n = foundUser.post[ind].like.n + a;
        if (a === -1) {
          const arr = foundUser.post[ind].like.likedBy.filter((u) => {
            return u.user != req.user._id;
          });
          foundUser.post[ind].like.likedBy = arr;
        } else {
          foundUser.post[ind].like.likedBy.push({
            user: req.user._id,
            date: Date.now(),
          });
        }
        foundUser.save();
        res.json({ message: true, n: n });
        // const update = foundUser.post.find((p)=>{
        //   return p._id == req.body._id;
        // })
        // console.log(update);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

blog.post("/success/check", function (req, res) {
  if (req.isAuthenticated()) {
    USER.findById({ _id: req.body.id })
      .then((foundUser) => {
        let ind = 0;
        foundUser.post.filter((p, i) => {
          console.log("p._id:" + p._id, "post:" + req.body.pid);
          console.log(p._id == req.body.pid);
          if (p._id == req.body.pid) {
            ind = i;
          }
        });
        let n = -1;
        foundUser.post[ind].like.likedBy.filter((l, i) => {
          if (l.user == req.user._id) {
            n = 1;
          }
        });
        if (n == 1) {
          res.json({
            message: true,
            like: foundUser.post[ind].like.n,
            comment: foundUser.post[ind].comments,
          });
        } else {
          res.json({
            message: false,
            like: foundUser.post[ind].like.n,
            comment: foundUser.post[ind].comments,
          });
        }
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

blog.post("/success/comment", function (req, res) {
  if (req.isAuthenticated()) {
    let ind = 0;
    USER.findById({ _id: req.body.id }).then((foundUser) => {
      foundUser.post.filter((p, i) => {
        if (p._id == req.body._id) {
          ind = i;
        }
      });
      console.log(req.body.comment);
      let newComment = {
        comment: req.body.comment,
        user: req.user.name,
        image: req.user.image,
      };
      foundUser.post[ind].comments.push(newComment);
      foundUser.save().then(() => {
        res.json({ user: req.user.name, image: req.user.image });
      });
    });
  }
});

blog.post("/edit", upload.single("image"), function (req, res) {
  console.log(false);
  if (req.isAuthenticated()) {
    const title = req.body.title;
    let image = "";
    if (req.file) {
      image = req.file.path;
    }
    const content = req.body.content;
    USER.findById({ _id: req.body.id }).then(async (foundUser) => {
      let ind = 0;
      const a = foundUser.post.filter((p, i) => {
        if (p._id == req.body.pid) {
          ind = i;
        }
        return p._id == req.body.pid;
      });
      if (image == "") {
        image = a[0].image;
      } else {
        // unlink(a[0].image, (err) => {
        //   if (err) throw err;
        //   console.log(a[0].image + ' was deleted');
        // });
        await cloudinary.uploader.destroy(a[0].public_id);
      }
      foundUser.post[ind].title = title;
      foundUser.post[ind].content = content;
      foundUser.post[ind].image = image;
      foundUser
        .save()
        .then(() => {
          res.json({ message: true });
        })
        .catch((err) => {
          res.json({ message: false });
        });
    });
  }
});
blog.post("/del", function (req, res) {
  if (req.isAuthenticated()) {
    USER.findById({ _id: req.body.id }).then(async (foundUser) => {
      const a = foundUser.post.filter((p, i) => {
        return p._id != req.body.pid;
      });
      const b = foundUser.post.filter((p, i) => {
        return p._id == req.body.pid;
      });
      foundUser.post = a;
      console.log(b[0].public_id);
      // unlink(b[0].image, (err) => {
      //   if (err) throw err;
      //   console.log(b[0].image + ' was deleted');
      // });
      await cloudinary.uploader.destroy(b[0].public_id);
      foundUser
        .save()
        .then(() => {
          res.json({ message: true });
        })
        .catch((err) => {
          res.json({ message: false });
        });
    });
  }
});

blog.post("/blog", async function (req, res) {
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
});

blog.get("/trending", function (req, res) {
  if (req.isAuthenticated()) {
    let post = [];
    USER.find().then((foundUser) => {
      if (foundUser) {
        foundUser.map((user) => {
          return user.post.map((p) => {
            const newpost = {
              name: user.name,
              post: p,
              image: user.image,
              id: user.id,
            };
            post.push({ ...newpost });
            return post;
          });
        });
        post.sort((a, b) => b.post.like.n - a.post.like.n);
        res.json({ post, image: req.user.image });
      }
    });
  }
});

blog.get("/new", function (req, res) {
  if (req.isAuthenticated()) {
    let post = [];
    USER.find().then((foundUser) => {
      if (foundUser) {
        foundUser.map((user) => {
          return user.post.map((p) => {
            const newpost = {
              name: user.name,
              post: p,
              image: user.image,
              id: user.id,
            };
            post.push({ ...newpost });
            return post;
          });
        });
        post.sort((a, b) => b.post.date - a.post.date);
        res.json({ post, image: req.user.image });
      }
    });
  }
});

export default blog;
