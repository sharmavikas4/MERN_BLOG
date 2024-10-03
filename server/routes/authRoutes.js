import { Router } from "express";
import passport from "passport";
const auth = Router();

auth.route("/auth").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

auth.route("/auth/google/test").get(
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: process.env.CLIENT_URL,
  })
);

export default auth;
