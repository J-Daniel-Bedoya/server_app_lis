const express = require('express');
const router = express.Router();
const inspectionsController = require('../controllers/inspections.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas protegidas - requieren autenticación
router.use(authMiddleware);

/**
 * @swagger
 * /api/v1/inspections:
 *   post:
 *     summary: Crear una nueva inspección técnica
 *     tags: [Inspections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - installationId
 *               - technicianId
 *               - inspectionDate
 *             properties:
 *               installationId:
 *                 type: integer
 *               technicianId:
 *                 type: integer
 *               inspectionDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [ok, issues, critical]
 *                 default: ok
 *               signalStrength:
 *                 type: number
 *                 format: float
 *                 minimum: -100
 *                 maximum: 0
 *               observations:
 *                 type: string
 *               nextInspectionDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Inspección creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inspection'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Instalación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/', inspectionsController.createInspection);

/**
 * @swagger
 * /api/v1/inspections/recent:
 *   get:
 *     summary: Obtener lista de inspecciones recientes
 *     tags: [Inspections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de inspecciones recientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inspection'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/recent', inspectionsController.getRecentInspections);

/**
 * @swagger
 * /api/v1/inspections/{id}:
 *   get:
 *     summary: Obtener una inspección por su ID
 *     tags: [Inspections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inspección
 *     responses:
 *       200:
 *         description: Inspección encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inspection'
 *       404:
 *         description: Inspección no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', inspectionsController.getInspectionById);

/**
 * @swagger
 * /api/v1/inspections/installation/{installationId}:
 *   get:
 *     summary: Obtener todas las inspecciones de una instalación
 *     tags: [Inspections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: installationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la instalación
 *     responses:
 *       200:
 *         description: Lista de inspecciones de la instalación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inspection'
 *       404:
 *         description: Instalación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/installation/:installationId', inspectionsController.getInspectionsByInstallation);

/**
 * @swagger
 * /api/v1/inspections/{id}:
 *   patch:
 *     summary: Actualizar una inspección existente
 *     tags: [Inspections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inspección
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ok, issues, critical]
 *               signalStrength:
 *                 type: number
 *                 format: float
 *                 minimum: -100
 *                 maximum: 0
 *               observations:
 *                 type: string
 *               nextInspectionDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Inspección actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inspection'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Inspección no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.patch('/:id', inspectionsController.updateInspection);

module.exports = router;
