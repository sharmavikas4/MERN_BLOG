import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import passport from "passport";
// Use of Passport Google oauth2.0
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.URL + "/auth/google/test",
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

passport.use(USER.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await USER.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
