import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';
import multer from 'multer';
import path from 'path';
import { unlink } from 'node:fs';
import * as dotenv from 'dotenv'
dotenv.config({ path: './.env'});
import MongoDBSession from 'connect-mongodb-session';
const MongoDBStore = MongoDBSession(session);
mongoose.connect(process.env.DB).then(()=>{
  console.log("Connected to database");
}).catch((err)=>{
  console.log(err.message);
})
// const store = new MongoDBStore({
//   uri: process.env.COOKIE,
//   collection: 'sessions',
// });

// store.on('error', function (error) {
//   console.log(error);
  // console.log(error);
// });
console.log(process.env.CLIENT_URL);
const app = express();
// const storage = multer.diskStorage({
//   destination: "./public/uploads",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000000 },
// });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods:  "GET,POST,PUT,DELETE"
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Auth-Token,Origin,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// app.set("trust proxy",1);
app.use(express.json());
// app.use(session({
//     secret: "Our little Secret",
//     resave: false,
//     saveUninitialized: true,
//     // store: store,
//     cookie: {
//       sameSite: "none",
//       secure: true,
//       maxAge: 1000*60*60*24*7
//     }
//   }));
app.use(session({
  secret: "Our little Secret",
  resave: false,
  saveUninitialized: false,
}));
  app.use(passport.initialize());
  app.use(passport.session());
   
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { runInNewContext } from 'vm';
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }                                                              
});
const upload = multer({ storage });
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    image: String,
    email: {type: String},
    googleId: String,
    post: [{
      title: String,
      content: String,
      image: String,
      like: {
        n: {type: Number, default: 0},
        likedBy: [{
          user: String,
          date: String
        }]
      },
      comments: [{
        comment: String,
        user: String,
        image: String
      }],
      date: Date,
      public_id: String
    }]
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const USER = new mongoose.model('USER',userSchema);
passport.use(USER.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await USER.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.URL + "/auth/google/test",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: ["profile","email"]
  }, function(accessToken, refreshToken, profile, cb) {
    USER.findOrCreate({
      email: profile.emails[0].value,
      name: profile.displayName,
      googleId: profile.id,
      image: profile.photos[0].value,
    }, function(err, user) {
      return cb(err, user);
    });
  }));
app.get('/',function(req,res){
    res.json({message:"hello"});
})
app.post('/',function(req,res){
    const newUser = new USER({ 
        ...req.body.user
    });
    console.log(newUser);
    newUser.save().then(()=>{
        console.log("Added successfully");
    }).catch((err)=>{
        console.log(err.message);
    });
})
app.get('/success',function(req,res){
  if (req.isAuthenticated()){
    USER.find().then((foundUsers)=>{
      if (foundUsers){
        res.json({message: true,user: foundUsers,img: req.user.image});
      }
    });
  }else{
    res.json({message:false});
  }
});
app.post('/success',upload.single("image"),async function(req,res){
  if (req.isAuthenticated()){
    console.log(req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path);
    const newpost = {
      title: req.body.title,
      content: req.body.content,
      image: req.file.path,
      date: Date.now(),
      public_id:result.public_id
    }
    
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
    USER.findById(req.user.id).then((foundUser)=>{
      if (foundUser){
        foundUser.post.push(newpost);
        foundUser.save().then(()=>{res.json({message: true})}).catch((err)=>{res.json({message: false})})
      }
    })
  }
});
// app.get("/success/like",function(req,res){
//   if (req.isAuthenticated()){
//     res.json(({message: "vikas"}))
//   }
// });
app.post("/success/like",function(req,res){
  if (req.isAuthenticated()){
    let ind = 0;
    USER.findById({_id: req.body.id}).then((foundUser)=>{
     foundUser.post.filter((p,i)=>{
      if (p._id == req.body._id){
        ind = i;
      }})
      var n = -1;
      if (foundUser.post[ind].like.likedBy.length === 0){
        n = -1;
      }
      else{
        if (foundUser){
          const index = foundUser.post[ind].like.likedBy.findIndex((u,i)=>{
            if (req.user._id == u.user){
              return true;
            }     
          })
          n = index;
        }
      }
      let a = 0;
      if (n!=-1){
        a = -1;
      }
      else {
        a = 1;
      }
      foundUser.post[ind].like.n = foundUser.post[ind].like.n + a;
      if (a===-1){
        const arr = foundUser.post[ind].like.likedBy.filter((u)=>{
          return u.user!=req.user._id;
        })
        foundUser.post[ind].like.likedBy = arr;
      }
      else {
        foundUser.post[ind].like.likedBy.push({user:req.user._id,date: Date.now()});
      }
      foundUser.save();
      res.json({message:true,n: n});
      // const update = foundUser.post.find((p)=>{
      //   return p._id == req.body._id;
      // })
      // console.log(update);
    }).catch((err)=>{
      res.json(err);
    })
  }
});
app.post("/edit",upload.single("image"),function(req,res){
  console.log(false);
  if (req.isAuthenticated()){
    const title = req.body.title;
    let image = "";
    if (req.file){
      image = req.file.path;
    }
    const content = req.body.content;
    USER.findById({_id: req.body.id}).then(async (foundUser)=>{
      let ind = 0;
      const a = foundUser.post.filter((p,i)=>{
        if (p._id==req.body.pid){
          ind = i;
        }
        return p._id==req.body.pid;
      });
      if (image==""){
        image = a[0].image;
      }else {
        // unlink(a[0].image, (err) => {
        //   if (err) throw err;
        //   console.log(a[0].image + ' was deleted');
        // });
        await cloudinary.uploader.destroy(a[0].public_id);
      }
      foundUser.post[ind].title = title;
      foundUser.post[ind].content = content;
      foundUser.post[ind].image = image;
      foundUser.save().then(()=>{res.json({message: true})}).catch((err)=>{res.json({message: false})});
    });
  }
})
app.post("/del",function(req,res){
  if (req.isAuthenticated()){
    USER.findById({_id: req.body.id}).then(async (foundUser)=>{
      const a = foundUser.post.filter((p,i)=>{
        return p._id != req.body.pid;
      })
      const b = foundUser.post.filter((p,i)=>{
        return p._id == req.body.pid;
      })
      foundUser.post = a;
      console.log(b[0].public_id);
      // unlink(b[0].image, (err) => {
      //   if (err) throw err;
      //   console.log(b[0].image + ' was deleted');
      // });
      await cloudinary.uploader.destroy(b[0].public_id);
      foundUser.save().then(()=>{res.json({message: true})}).catch((err)=>{res.json({message: false})});
    })
  }
});
app.post("/success/check",function(req,res){
  if (req.isAuthenticated()){
    USER.findById({_id: req.body.id}).then((foundUser)=>{
      let ind = 0;
      foundUser.post.filter((p,i)=>{
        console.log("p._id:" + p._id,"post:" + req.body.pid);
        console.log(p._id==req.body.pid);
        if (p._id == req.body.pid){
          ind = i;
        }
      });
      let n = -1;
      foundUser.post[ind].like.likedBy.filter((l,i)=>{
        if (l.user==req.user._id){
          n = 1;
        }
      })
      if (n==1){
        res.json({message: true,like: foundUser.post[ind].like.n,comment: foundUser.post[ind].comments});
      }
      else{
        res.json({message: false,like: foundUser.post[ind].like.n,comment: foundUser.post[ind].comments});
      }
    }).catch((err)=>{
      res.json(err);
    })
  }
})
app.post("/blog",async function(req,res){
  let post={};
  const id = req.body.id;
  console.log(id);
  USER.findOne({"post._id": id},{"post.$":1}).then((foundUser)=>{
    if (foundUser&&foundUser.post.length!=0){
      USER.findById({_id: foundUser._id}).then((found)=>{
        if (found){
          post = {
            name: found.name,
            post: foundUser.post[0]
          }
          res.json({post});
        }
      }).catch((err)=>{
        console.log(err.message);
      })
    }
  })
  })
app.get("/dashboard",function(req,res){
  if (req.isAuthenticated()){
    // console.log(req.user);
    res.json({user: req.user});
  }
})
app.post("/success/comment",function(req,res){
  if (req.isAuthenticated()){
    let ind = 0;
    USER.findById({_id: req.body.id}).then((foundUser)=>{
     foundUser.post.filter((p,i)=>{
      if (p._id == req.body._id){
        ind = i;
      }})
      console.log(req.body.comment);
    let newComment = {
      comment: req.body.comment,
      user:  req.user.name,
      image: req.user.image
    }
    foundUser.post[ind].comments.push(newComment);
    foundUser.save().then(()=>{
      res.json({user: req.user.name,image: req.user.image});
    })
  })}})
app.get("/trending",function(req,res){
  if (req.isAuthenticated()){
    let post = [];
    USER.find().then((foundUser)=>{
      if (foundUser){
        foundUser.map((user)=>{
          return user.post.map((p)=>{
            const newpost ={
              name: user.name,
              post: p,
              image: user.image,
              id: user.id
            }
            post.push({...newpost});
            return post;
          });
        })
        post.sort((a,b)=>b.post.like.n - a.post.like.n);
        res.json({post,image: req.user.image});
      }
    })
  }
})
app.get("/new",function(req,res){
  if (req.isAuthenticated()){
    let post = [];
    USER.find().then((foundUser)=>{
      if (foundUser){
        foundUser.map((user)=>{
          return user.post.map((p)=>{
            const newpost ={
              name: user.name,
              post: p,
              image: user.image,
              id: user.id
            }
            post.push({...newpost});
            return post;
          });
        })
        post.sort((a,b)=>b.post.date - a.post.date);
        res.json({post,image: req.user.image});
      }
    })
  }
})
app.get("/likedPost",function(req,res){
  if (req.isAuthenticated()){
    let post = [];
    USER.find().then((foundUser)=>{
      if (foundUser){
        foundUser.map((user)=>{
          return user.post.map((p)=>{
            return p.like.likedBy.map((l)=>{
              if (l.user === req.user.id){
                const newpost ={
                  name: user.name,
                  post: p,
                  image: user.image,
                  id: user.id
                }
                post.push({...newpost});
                return post;
              }
            })
          });
        })
        post.sort((a,b)=>b.post.date - a.post.date);
        res.json({post,image: req.user.image,name: req.user.name,id: req.user.id});
      }
    })
  }
})
app.route("/logout")
  .get(function(req, res) {
    req.logout(function(err) {
      console.log(err);
    });
    res.json({message:false});
  });
app.route('/auth/google')
  .get(passport.authenticate('google', {
    scope: ["profile","email"]
  }));
app.route('/auth/google/test')
  .get(passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: process.env.CLIENT_URL
  }));
  app.route('/failure')
  .get(function(req,res) {
    res.json({message:"failure"});
  })
app.listen(3000||process.env.Port,function(){
       console.log('Server is running on the port 3000');
});
