const { Router } = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  getAllCustomers,
  getCustomerById,
  getCustomerByDni,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customer.controller');

const router = Router();

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, getAllCustomers);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authMiddleware, getCustomerById);

/**
 * @swagger
 * /api/v1/customers/dni/{dni}:
 *   get:
 *     summary: Obtener un cliente por DNI
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/dni/:dni', authMiddleware, getCustomerByDni);

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dni
 *               - name
 *               - phone
 *             properties:
 *               dni:
 *                 type: string
 *                 description: Número de identificación del cliente
 *               name:
 *                 type: string
 *                 description: Nombre completo del cliente
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del cliente
 *               address:
 *                 type: string
 *                 description: Dirección del cliente
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', [authMiddleware, adminMiddleware], createCustomer);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   put:
 *     summary: Actualizar un cliente existente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: Número de identificación del cliente
 *               name:
 *                 type: string
 *                 description: Nombre completo del cliente
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del cliente
 *               address:
 *                 type: string
 *                 description: Dirección del cliente
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', [authMiddleware, adminMiddleware], updateCustomer);

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', [authMiddleware, adminMiddleware], deleteCustomer);

module.exports = router;
