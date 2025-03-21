const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { sectorController: { 
  getAllSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector
} } = require('../controllers');

// Rutas de sectores - todas protegidas con autenticación
router.get("/", authMiddleware, getAllSectors);
router.get("/:id", authMiddleware, getSectorById);
router.post("/", authMiddleware, createSector);
router.put("/:id", authMiddleware, updateSector);
router.delete("/:id", authMiddleware, deleteSector);

module.exports = router;
