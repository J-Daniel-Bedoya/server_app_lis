const express = require("express");
const router = express.Router();
const {
  authController: { login, getProfile },
} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");

// Ruta pública para iniciar sesión
router.post("/login", login);

// Ruta protegida para obtener el perfil del usuario autenticado
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
