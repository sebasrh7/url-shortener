import passport from "passport";
import dotenv from "dotenv";
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
  console.log(req.session);
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
