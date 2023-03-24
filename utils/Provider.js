import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Users } from "../models/Users.js";
export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        //database come here
        const user = await Users.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = await Users.create({
            name: profile.displayName,
            photo: profile.photos[0].value,
            googleId: profile.id,
          });
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await Users.findById(id);
    done(null, user);
  });
};
