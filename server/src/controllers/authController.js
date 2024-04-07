import passport from "passport";
import dotenv from "dotenv";
import User from "../models/User.js";
import Url from "../models/Url.js";
dotenv.config();

export const login = passport.authenticate("auth0", {
  scope: "openid email profile",
});

export const callback = passport.authenticate("auth0", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/login/failure",
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
};

export const loginSuccess = (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ message: "User has successfully logged in.", user: req.user });
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};

export const loginFailure = (req, res) => {
  res.status(401).json({ message: "User failed to log in." });
};

export const deleteAccount = async (req, res) => {
  try {
    await Url.deleteMany({ user: req.user._id }); // Delete all urls created by user
    await User.findByIdAndDelete(req.user._id); // Delete user account
    req.logout();
    res.status(200).json({ message: "User account has been deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user account." });
  }
};
