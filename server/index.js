import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
/* 
import path from "path";
import { unlink } from "node:fs"; */

import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env.CLIENT_URL);
const app = express();

// database Connection
import connect from "./config/database.js";
connect();

// database model calls
import USER from "./models/userModel.js";

//routes
import auth from "./routes/authRoutes.js";
import blog from "./routes/blogRoutes.js";
import user from "./routes/userRoutes.js";

// middlewares
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
/* app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
); */
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type,X-Auth-Token,Origin,Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
// app.set("trust proxy", 1);
app.use(
  session({
    secret: "Our little Secret",
    resave: false,
    saveUninitialized: true,
    // store: store,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// app.use(
//   session({
//     secret: "Our little Secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(passport.initialize());
app.use(passport.session());

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

// auth routes
app.use("/", auth);

// blog routes
app.use("/", blog);

// user Routes
app.use("/", user);

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

app.route("/failure").get(function (req, res) {
  res.json({ message: "failure" });
});

app.get("/", function (req, res) {
  res.json({ message: "hello" });
});

app.listen(3000 || process.env.Port, function () {
  console.log("Server is running on the port 3000");
});
