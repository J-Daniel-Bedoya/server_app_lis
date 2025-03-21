const express = require('express');
const router = express.Router();
const inspectionsController = require('../controllers/inspections.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas protegidas - requieren autenticación
router.use(authMiddleware);

// POST /api/v1/inspections - Crear nueva revisión
router.post('/', 
  inspectionsController.createInspection
);

// GET /api/v1/inspections/recent - Obtener revisiones recientes
router.get('/recent', 
  inspectionsController.getRecentInspections
);

// GET /api/v1/inspections/:id - Obtener revisión por ID
router.get('/:id', 
  inspectionsController.getInspectionById
);

// GET /api/v1/inspections/installation/:installationId - Obtener revisiones de una instalación
router.get('/installation/:installationId', 
  inspectionsController.getInspectionsByInstallation
);

// PATCH /api/v1/inspections/:id - Actualizar revisión
router.patch('/:id', 
  inspectionsController.updateInspection
);

module.exports = router;
