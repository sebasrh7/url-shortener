import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import Auth0Strategy from "passport-auth0";
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

// Session configuration
// const sessionConfig = {
//   secret: process.env.SESSION_SECRET,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // 24 hours
//   },
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: uri }),
// };

// app.use(session(sessionConfig));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      name: "cookie",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: false,
    },
  })
);

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Cors
const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost:3000"],
};
app.use(cors(corsOptions));

// Middleware
app.use(morgan("dev"));

// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use(router);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
