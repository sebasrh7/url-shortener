import { Router } from "express";
import {
  createShortUrl,
  getUrls,
  getUrl,
  updateUrl,
  deleteUrl,
  redirectOriginalUrl,
} from "../controllers/urlController.js";
import {
  login,
  callback,
  logout,
  loginSuccess,
  loginFailure,
} from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { ensureAuthenticated } from "../middlewares/authenticatedMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";

const router = Router();

// Home
router.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener API!");
});

// Auth0 login
router.get("/login", login);

// Auth0 callback
router.get("/callback", callback);

// Auth0 logout
router.get("/logout", logout);

// Auth0 login success
router.get("/login/success", ensureAuthenticated, loginSuccess);

// Auth0 login failure
router.get("/login/failure", ensureAuthenticated, loginFailure);

// Routes for URL Shortener
router.post("/shorten", validateSchema(urlSchema), createShortUrl); // Crear
router.get("/urls", getUrls); // Leer todas
router.get("/url/:id", getUrl); // Leer
router.put("/update/:id", validateSchema(urlSchema), updateUrl); // Actualizar
router.delete("/delete/:id", deleteUrl); // Eliminar
router.get("/:shortUrlId", redirectOriginalUrl); // Redireccionar

export default router;
