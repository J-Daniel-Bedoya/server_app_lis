const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { towerController: { 
  getAllTowers,
  getTowerById,
  createTower,
  updateTower,
  deleteTower
} } = require('../controllers');

// Rutas de torres - todas protegidas con autenticación
router.get("/", authMiddleware, getAllTowers);
router.get("/:id", authMiddleware, getTowerById);
router.post("/", authMiddleware, createTower);
router.put("/:id", authMiddleware, updateTower);
router.delete("/:id", authMiddleware, deleteTower);

module.exports = router;
