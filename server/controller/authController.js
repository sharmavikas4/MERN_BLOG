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
  session: true,
});

//logout
const logout = (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Logout failed" });
      }
    });
    res.json({ message: false });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export { logout, googleAuth, googleAuthCallback };
