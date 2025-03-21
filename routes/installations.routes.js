const express = require('express');
const router = express.Router();
const installationsController = require('../controllers/installations.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

// Rutas protegidas - requieren autenticación
router.use(authMiddleware);

// POST /api/v1/installations - Crear nueva instalación
router.post('/', 
  installationsController.createInstallation
);

// GET /api/v1/installations/pending - Obtener instalaciones pendientes
router.get('/pending', 
  installationsController.getPendingInstallations
);

// GET /api/v1/installations/:id - Obtener instalación por ID
router.get('/:id', 
  installationsController.getInstallationById
);

// PATCH /api/v1/installations/:id/status - Actualizar estado de instalación
router.patch('/:id/status',
  installationsController.updateInstallationStatus
);

module.exports = router;
