import e, { Router } from "express";
import {
  createShortUrl,
  getUrls,
  getUrl,
  updateUrl,
  deleteUrl,
  deleteSelected,
  redirectOriginalUrl,
} from "../controllers/urlController.js";
import {
  login,
  callback,
  logout,
  loginSuccess,
  loginFailure,
  deleteAccount,
} from "../controllers/authController.js";
import {
  guestCreateShortUrl,
  guestGetUrls,
  guestGetUrl,
  guestDeleteUrl,
  guestDeleteSelected,
  guestRedirectOriginalUrl,
} from "../controllers/guestController.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";

const router = Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Home
router.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener API!");
});

// Routes for guest users
router.post("/guest/shorten", validateSchema(urlSchema), guestCreateShortUrl); // Create
router.get("/guest/urls", guestGetUrls); // Read all
router.get("/guest/url/:id", guestGetUrl); // Read
router.delete("/guest/delete/:id", guestDeleteUrl); // Delete
router.delete("/guest/deleteSelected", guestDeleteSelected); // Delete selected
router.get("/guest/:shortUrlId", guestRedirectOriginalUrl); // Redirect

// Routes for Auth0
// Auth0 login
router.get("/login", login);

// Auth0 callback
router.get("/callback", callback);

// Auth0 logout
router.get("/logout", logout);

// Auth0 login success
router.get("/login/success", ensureAuthenticated, loginSuccess);

// Auth0 login failure
router.get("/login/failure", loginFailure);

router.delete("/delete/account", ensureAuthenticated, deleteAccount);

// Routes for URL Shortener
router.post(
  "/shorten",
  ensureAuthenticated,
  validateSchema(urlSchema),
  createShortUrl
); // Create
router.get("/urls", ensureAuthenticated, getUrls); // Read all
router.get("/url/:id", ensureAuthenticated, getUrl); // Read
router.put(
  "/update/:id",
  ensureAuthenticated,
  validateSchema(urlSchema),
  updateUrl
); // Update
router.delete("/delete/:id", ensureAuthenticated, deleteUrl); // Delete
router.delete("/deleteSelected", ensureAuthenticated, deleteSelected); // Delete selected
router.get("/:shortUrlId", redirectOriginalUrl); // Redirect

export default router;
