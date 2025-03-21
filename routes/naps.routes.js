const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { napController: { 
  getAllNaps,
  getNapById,
  createNap,
  updateNap,
  deleteNap
} } = require('../controllers');

// Rutas de NAPs - todas protegidas con autenticación
router.get("/", authMiddleware, getAllNaps);
router.get("/:id", authMiddleware, getNapById);
router.post("/", authMiddleware, createNap);
router.put("/:id", authMiddleware, updateNap);
router.delete("/:id", authMiddleware, deleteNap);

module.exports = router;
