import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import path from "path";
import { unlink } from "node:fs";
import * as dotenv from "dotenv";
import connect from "./config/database.js";
import { passport } from "./config/passport.js";
import USER from "./models/userModel.js"; // Import USER model
import blog from "./routes/blogRoutes.js";
import user from "./routes/userRoutes.js";
import auth from "./routes/authRoutes.js";

dotenv.config({ path: "./.env" });
const MongoDBStore = MongoDBSession(session);
connect();

const app = express();

console.log(process.env.CLIENT_URL);

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
}));
app.use(express.json());
app.use(session({
  secret: "Our little Secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

// User Creation Route
app.post("/", async (req, res) => {
  try {
    const newUser = new USER({
      ...req.body.user,
    });
    console.log(newUser);
    await newUser.save();
    console.log("Added successfully");
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err); // Log the error for debugging
  res.status(err.status || 500).json({
    message: "An error occurred",
    error: err.message,
  });
});

// Route Setup
app.use("/", blog);
app.use("/", user);
app.use("/", auth);

// Failure Route
app.route("/failure").get((req, res) => {
  res.json({ message: "failure" });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Shutting down server...");
  process.exit(0);
});
