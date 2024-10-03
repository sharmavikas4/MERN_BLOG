import { passport } from "../config/passport.js";
import dotenv from "dotenv";
dotenv.config();
// Google OAuth login
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google OAuth callback
const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/failure",
  successRedirect: process.env.CLIENT_URL,
});

// Logout the user
const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.json({ message: false });
};

export { logout, googleAuth, googleAuthCallback };
