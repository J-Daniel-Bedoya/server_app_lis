const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  userController: {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  },
} = require("../controllers");

// Ruta para crear usuarios:
// - Sin autenticación si es el primer usuario (será admin)
// - Requiere ser admin para crear usuarios subsecuentes
router.post("/", async (req, res, next) => {
  const { User } = require("../models");
  const userCount = await User.count();
  
  if (userCount === 0) {
    // Si no hay usuarios, permitir la creación del primer admin
    return createUser(req, res);
  }
  // Si ya hay usuarios, requerir autenticación y rol de admin
  authMiddleware(req, res, () => {
    adminMiddleware(req, res, () => createUser(req, res));
  });
});

// Rutas protegidas que requieren autenticación
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);

// Rutas protegidas que requieren ser admin
router.put("/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
