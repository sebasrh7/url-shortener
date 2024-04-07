export const authRequeride = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sessionID;
    next();
  }
};
