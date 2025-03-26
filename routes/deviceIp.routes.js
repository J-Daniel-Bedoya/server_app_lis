const { Router } = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  getAllDeviceIps,
  getDeviceIpById,
  createDeviceIp,
  updateDeviceIp,
  deleteDeviceIp
} = require('../controllers/deviceIp.controller');

const router = Router();

/**
 * @swagger
 * /api/v1/device-ips:
 *   get:
 *     summary: Obtener todas las IPs de dispositivos
 *     tags: [IPs de Dispositivos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de IPs de dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeviceIp'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, getAllDeviceIps);

/**
 * @swagger
 * /api/v1/device-ips/{installationId}:
 *   get:
 *     summary: Obtener una IP de dispositivo por ID de instalación
 *     tags: [IPs de Dispositivos]
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
 *         description: IP de dispositivo encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceIp'
 *       404:
 *         description: IP de dispositivo no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:installationId', authMiddleware, getDeviceIpById);

/**
 * @swagger
 * /api/v1/device-ips:
 *   post:
 *     summary: Crear una nueva IP de dispositivo
 *     tags: [IPs de Dispositivos]
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
 *               - ip
 *               - type
 *             properties:
 *               installationId:
 *                 type: integer
 *                 description: ID de la instalación asociada
 *               ip:
 *                 type: string
 *                 description: Dirección IP del dispositivo
 *               type:
 *                 type: string
 *                 enum: ['onu', 'router', 'other']
 *                 description: Tipo de dispositivo
 *               macAddress:
 *                 type: string
 *                 description: Dirección MAC del dispositivo
 *               description:
 *                 type: string
 *                 description: Descripción adicional del dispositivo
 *     responses:
 *       201:
 *         description: IP de dispositivo creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceIp'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', [authMiddleware, adminMiddleware], createDeviceIp);

/**
 * @swagger
 * /api/v1/device-ips/{installationId}:
 *   put:
 *     summary: Actualizar una IP de dispositivo existente
 *     tags: [IPs de Dispositivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: installationId
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
 *             properties:
 *               installationId:
 *                 type: integer
 *                 description: ID de la instalación asociada
 *               ip:
 *                 type: string
 *                 description: Dirección IP del dispositivo
 *               type:
 *                 type: string
 *                 enum: ['onu', 'router', 'other']
 *                 description: Tipo de dispositivo
 *               macAddress:
 *                 type: string
 *                 description: Dirección MAC del dispositivo
 *               description:
 *                 type: string
 *                 description: Descripción adicional del dispositivo
 *     responses:
 *       200:
 *         description: IP de dispositivo actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceIp'
 *       404:
 *         description: IP de dispositivo no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:installationId', [authMiddleware, adminMiddleware], updateDeviceIp);

/**
 * @swagger
 * /api/v1/device-ips/{installationId}:
 *   delete:
 *     summary: Eliminar una IP de dispositivo
 *     tags: [IPs de Dispositivos]
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
 *         description: IP de dispositivo eliminada exitosamente
 *       404:
 *         description: IP de dispositivo no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:installationId', [authMiddleware, adminMiddleware], deleteDeviceIp);

module.exports = router;
