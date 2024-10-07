import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import path from "path";
import { unlink } from "node:fs";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const MongoDBStore = MongoDBSession(session);
import connect from "./config/database.js";

connect();

import { passport } from "./config/passport.js"; // setup passport

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,X-Auth-Token,Origin,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
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
app.use(
  session({
    secret: "Our little Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

import USER from "./models/userModel.js"; // Import USER model

app.get("/", function (req, res) {
  res.json({ message: "hello" });
});
app.post("/", function (req, res) {
  const newUser = new USER({
    ...req.body.user,
  });
  console.log(newUser);
  newUser
    .save()
    .then(() => {
      console.log("Added successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// all blog routes
import blog from "./routes/blogRoutes.js";
app.use("/", blog);

import user from "./routes/userRoutes.js";
app.use("/", user);

import auth from "./routes/authRoutes.js";
app.use("/", auth);

app.route("/failure").get(function (req, res) {
  res.json({ message: "failure" });
});
app.listen(3000 || process.env.Port, function () {
  console.log("Server is running on the port 3000");
});
