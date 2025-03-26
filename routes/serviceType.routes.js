const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getAllServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType
} = require('../controllers/serviceType.controller');

const router = Router();

/**
 * @swagger
 * /api/v1/service-types:
 *   get:
 *     summary: Obtener todos los tipos de servicio
 *     tags: [Tipos de Servicio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceType'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, getAllServiceTypes);

/**
 * @swagger
 * /api/v1/service-types/{id}:
 *   get:
 *     summary: Obtener un tipo de servicio por ID
 *     tags: [Tipos de Servicio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de servicio
 *     responses:
 *       200:
 *         description: Tipo de servicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceType'
 *       404:
 *         description: Tipo de servicio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authMiddleware, getServiceTypeById);

/**
 * @swagger
 * /api/v1/service-types:
 *   post:
 *     summary: Crear un nuevo tipo de servicio
 *     tags: [Tipos de Servicio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del tipo de servicio
 *               description:
 *                 type: string
 *                 description: Descripción del tipo de servicio
 *     responses:
 *       201:
 *         description: Tipo de servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceType'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', [authMiddleware, adminMiddleware], createServiceType);

/**
 * @swagger
 * /api/v1/service-types/{id}:
 *   put:
 *     summary: Actualizar un tipo de servicio existente
 *     tags: [Tipos de Servicio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del tipo de servicio
 *               description:
 *                 type: string
 *                 description: Descripción del tipo de servicio
 *     responses:
 *       200:
 *         description: Tipo de servicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceType'
 *       404:
 *         description: Tipo de servicio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', [authMiddleware, adminMiddleware], updateServiceType);

/**
 * @swagger
 * /api/v1/service-types/{id}:
 *   delete:
 *     summary: Eliminar un tipo de servicio
 *     tags: [Tipos de Servicio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de servicio
 *     responses:
 *       200:
 *         description: Tipo de servicio eliminado exitosamente
 *       404:
 *         description: Tipo de servicio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', [authMiddleware, adminMiddleware], deleteServiceType);

module.exports = router;
