const express = require('express');
const router = express.Router();
const installationsController = require('../controllers/installations.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

// Rutas protegidas - requieren autenticación
router.use(authMiddleware);

/**
 * @swagger
 * /api/v1/installations:
 *   post:
 *     summary: Crear una nueva instalación
 *     tags: [Installations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - areaId
 *               - clientId
 *               - clientName
 *               - phoneNumber
 *               - ipAddress
 *               - macAddress
 *               - technicianId
 *               - installationDate
 *             properties:
 *               areaId:
 *                 type: integer
 *               sectorId:
 *                 type: integer
 *               fiberId:
 *                 type: integer
 *               napId:
 *                 type: integer
 *               clientId:
 *                 type: string
 *               clientName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               macAddress:
 *                 type: string
 *               technicianId:
 *                 type: integer
 *               installationDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Instalación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Installation'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', 
  installationsController.createInstallation
);

/**
 * @swagger
 * /api/v1/installations/pending:
 *   get:
 *     summary: Obtener lista de instalaciones pendientes
 *     tags: [Installations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instalaciones pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Installation'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/pending', 
  installationsController.getPendingInstallations
);

/**
 * @swagger
 * /api/v1/installations/{id}:
 *   get:
 *     summary: Obtener una instalación por su ID
 *     tags: [Installations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la instalación
 *     responses:
 *       200:
 *         description: Instalación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Installation'
 *       404:
 *         description: Instalación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', 
  installationsController.getInstallationById
);

/**
 * @swagger
 * /api/v1/installations/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de una instalación
 *     tags: [Installations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la instalación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, inProgress, completed, cancelled]
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Installation'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Instalación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.patch('/:id/status', 
  installationsController.updateInstallationStatus
);

module.exports = router;
