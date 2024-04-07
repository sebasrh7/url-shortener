import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import Auth0Strategy from "passport-auth0";
import session from "express-session";
import User from "./models/User.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const uri = process.env.DATABASE_URL;
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Initialize Express
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Express session middleware
app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware for authentication and session management with Auth0
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL, // This is the route Auth0 will redirect to after the user logs in
  },
  async (accessToken, refreshToken, extraParams, profile, done) => {
    try {
      const user = await User.findOne({ auth0Id: profile.id });
      if (!user) {
        const newUser = new User({
          auth0Id: profile.id,
          displayName: profile.displayName,
          nickname: profile.nickname,
          emails: profile.emails,
          picture: profile.picture,
          provider: profile.provider,
          date: new Date(),
        });
        await newUser.save();

        return done(null, newUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
);
passport.use(strategy);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Middleware for logging HTTP requests to the console
app.use(morgan("dev"));

// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use(router);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
