import {
  createShortUrl,
  getUrls,
  getUrl,
  updateUrl,
  deleteUrl,
  redirectOriginalUrl,
} from "../controllers/urlController.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { ensureAuthenticated } from "../middlewares/authenticatedMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { Router } from "express";
import passport from "passport";

const router = Router();
// Auth0 login
router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile",
  }),
);

// Auth0 logout
router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) { 
    req.logout();
    res.redirect("/");
  }
  res.redirect("/");
  console.log({ message: "You are not logged in." });
});

// Auth0 callback
router.get(
  "/callback",
  passport.authenticate("auth0", { failureRedirect: "/login" }), 
  (req, res) => {
    res.redirect("/"); // Redirect to the home page after authentication
  }
);

// Home
router.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener API!");
});
// Routes for URL Shortener
router.post("/shorten", validateSchema(urlSchema), createShortUrl); // Crear
router.get("/urls", ensureAuthenticated, getUrls); // Leer todas
router.get("/url/:id", getUrl); // Leer
router.put("/update/:id", validateSchema(urlSchema), updateUrl); // Actualizar
router.delete("/delete/:id", deleteUrl); // Eliminar
router.get("/:shortUrlId", redirectOriginalUrl); // Redireccionar

export default router;
