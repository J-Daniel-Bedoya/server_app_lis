const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { areaController: { 
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea
} } = require('../controllers');

// Rutas de áreas - todas protegidas con autenticación
router.get("/", authMiddleware, getAllAreas);
router.get("/:id", authMiddleware, getAreaById);
router.post("/", authMiddleware, createArea);
router.put("/:id", authMiddleware, updateArea);
router.delete("/:id", authMiddleware, deleteArea);

module.exports = router;
