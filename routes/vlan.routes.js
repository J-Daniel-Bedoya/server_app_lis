const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getAllVlans,
  getVlanById,
  createVlan,
  updateVlan,
  deleteVlan
} = require('../controllers/vlan.controller');

const router = Router();

/**
 * @swagger
 * /api/v1/vlans:
 *   get:
 *     summary: Obtener todas las VLANs
 *     tags: [VLANs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de VLANs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vlan'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, getAllVlans);

/**
 * @swagger
 * /api/v1/vlans/{id}:
 *   get:
 *     summary: Obtener una VLAN por ID
 *     tags: [VLANs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la VLAN
 *     responses:
 *       200:
 *         description: VLAN encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vlan'
 *       404:
 *         description: VLAN no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authMiddleware, getVlanById);

/**
 * @swagger
 * /api/v1/vlans:
 *   post:
 *     summary: Crear una nueva VLAN
 *     tags: [VLANs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fiberId
 *               - name
 *               - ip
 *               - mask
 *               - gateway
 *             properties:
 *               fiberId:
 *                 type: integer
 *                 description: ID de la fibra a la que pertenece la VLAN
 *               name:
 *                 type: string
 *                 description: Nombre de la VLAN
 *               ip:
 *                 type: string
 *                 description: Dirección IP de la VLAN
 *               mask:
 *                 type: string
 *                 description: Máscara de red
 *               gateway:
 *                 type: string
 *                 description: Gateway de la VLAN
 *     responses:
 *       201:
 *         description: VLAN creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vlan'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', [authMiddleware, adminMiddleware], createVlan);

/**
 * @swagger
 * /api/v1/vlans/{id}:
 *   put:
 *     summary: Actualizar una VLAN existente
 *     tags: [VLANs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la VLAN
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fiberId:
 *                 type: integer
 *                 description: ID de la fibra a la que pertenece la VLAN
 *               name:
 *                 type: string
 *                 description: Nombre de la VLAN
 *               ip:
 *                 type: string
 *                 description: Dirección IP de la VLAN
 *               mask:
 *                 type: string
 *                 description: Máscara de red
 *               gateway:
 *                 type: string
 *                 description: Gateway de la VLAN
 *     responses:
 *       200:
 *         description: VLAN actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vlan'
 *       404:
 *         description: VLAN no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', [authMiddleware, adminMiddleware], updateVlan);

/**
 * @swagger
 * /api/v1/vlans/{id}:
 *   delete:
 *     summary: Eliminar una VLAN
 *     tags: [VLANs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la VLAN
 *     responses:
 *       200:
 *         description: VLAN eliminada exitosamente
 *       404:
 *         description: VLAN no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', [authMiddleware, adminMiddleware], deleteVlan);

module.exports = router;
