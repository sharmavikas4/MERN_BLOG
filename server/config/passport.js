import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import USER from "../models/userModel.js"; // Make sure the path to the USER model is correct
import dotenv from "dotenv";

dotenv.config();

// Local strategy setup
passport.use(USER.createStrategy());

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.URL + "/auth/google/callback",  // Updated the callback URL
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      USER.findOrCreate(
        {
          email: profile.emails[0].value,
          name: profile.displayName,
          googleId: profile.id,
          image: profile.photos[0].value,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

// Serialize the user
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize the user
passport.deserializeUser(async function (id, done) {
  try {
    const user = await USER.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export { passport };
