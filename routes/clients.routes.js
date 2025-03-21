const express = require("express");
const router = express.Router();
const {
  clientController: { getAllClients, getClientById, createClient, updateClient, deleteClient },
} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/v1/clients:
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
 *                 $ref: '#/components/schemas/Client'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               cel:
 *                 type: string
 *                 example: "3164452345"
 *                 pattern: "^\\+?[1-9]\\d{1,14}$"
 *               serviceType:
 *                 type: string
 *                 enum: [antenna, fiber]
 *                 example: "fiber"
 *               macAddress:
 *                 type: string
 *                 example: "50:5B:1D:45:23:B9"
 *                 pattern: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"
 *               antennaIp:
 *                 type: string
 *                 example: "192.168.1.101"
 *                 description: "Requerido para servicio antenna, debe terminar en número impar"
 *               modemIp:
 *                 type: string
 *                 example: "192.168.1.1"
 *                 description: "Requerido para servicio antenna"
 *               onuIp:
 *                 type: string
 *                 example: "192.168.1.2"
 *                 description: "Requerido para servicio fiber"
 *               technician_id:
 *                 type: integer
 *                 example: 1
 *                 description: "ID de un usuario con rol technician"
 *               sector_id:
 *                 type: integer
 *                 example: 1
 *                 description: "Requerido para servicio antenna"
 *               nap_id:
 *                 type: integer
 *                 example: 1
 *                 description: "Requerido para servicio fiber"
 *             required:
 *               - name
 *               - cel
 *               - serviceType
 *               - macAddress
 *               - technician_id
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               antennaService:
 *                 value:
 *                   message: "Error de validación"
 *                   error: "Antenna IP is required for antenna service"
 *               fiberService:
 *                 value:
 *                   message: "Error de validación"
 *                   error: "ONU IP is required for fiber service"
 *               invalidTechnician:
 *                 value:
 *                   message: "Error de validación"
 *                   error: "Assigned user must have technician role"
 */
router.get("/", authMiddleware, getAllClients);
router.post("/", authMiddleware, createClient);

/**
 * @swagger
 * /api/v1/clients/{id}:
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
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Actualizar un cliente
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
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente eliminado exitosamente"
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, getClientById);
router.put("/:id", authMiddleware, updateClient);
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;
