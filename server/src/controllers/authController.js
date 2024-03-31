import passport from "passport";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

export const login = passport.authenticate("auth0", {
  scope: "openid email profile",
});

export const callback = passport.authenticate("auth0", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login/failure",
});

export const logout = (req, res) => {
  if (req.user) {
    req.logout(() => {
      res.redirect(process.env.CLIENT_URL);
    });
  } else {
    res.redirect("/");
  }
};

export const loginSuccess = (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: "User has successfully logged in.",
      user: req.user,
    });
  }

  res.status(401).json({ message: "User failed to log in." });
};

export const loginFailure = (req, res) => {
  res.status(401).json({ message: "User failed to log in." });
};
