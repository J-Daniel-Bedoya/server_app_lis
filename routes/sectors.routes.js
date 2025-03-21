const express = require("express");
const router = express.Router();
const {
  sectorController: { getAllSectors, getSectorById, createSector, updateSector, deleteSector },
} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

/**
 * @swagger
 * /api/v1/sectors:
 *   get:
 *     summary: Obtener todos los sectores
 *     tags: [Sectores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sectores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sector'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Crear un nuevo sector
 *     tags: [Sectores]
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
 *                 example: "Sector Norte"
 *               description:
 *                 type: string
 *                 example: "Sector que cubre la zona norte de la torre"
 *               azimuth:
 *                 type: number
 *                 format: float
 *                 example: 45.5
 *               beamwidth:
 *                 type: number
 *                 format: float
 *                 example: 120
 *               frequency:
 *                 type: string
 *                 example: "5.8 GHz"
 *               polarization:
 *                 type: string
 *                 enum: [vertical, horizontal]
 *                 example: "vertical"
 *               gain:
 *                 type: number
 *                 format: float
 *                 example: 16
 *               towerId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - name
 *               - azimuth
 *               - beamwidth
 *               - frequency
 *               - polarization
 *               - gain
 *               - towerId
 *     responses:
 *       201:
 *         description: Sector creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sector'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Torre no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", authMiddleware, getAllSectors);
router.post("/", [authMiddleware, adminMiddleware], createSector);

/**
 * @swagger
 * /api/v1/sectors/{id}:
 *   get:
 *     summary: Obtener un sector por ID
 *     tags: [Sectores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del sector
 *     responses:
 *       200:
 *         description: Sector encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sector'
 *       404:
 *         description: Sector no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Actualizar un sector
 *     tags: [Sectores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del sector
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sector Norte"
 *               description:
 *                 type: string
 *                 example: "Sector que cubre la zona norte de la torre"
 *               azimuth:
 *                 type: number
 *                 format: float
 *                 example: 45.5
 *               beamwidth:
 *                 type: number
 *                 format: float
 *                 example: 120
 *               frequency:
 *                 type: string
 *                 example: "5.8 GHz"
 *               polarization:
 *                 type: string
 *                 enum: [vertical, horizontal]
 *                 example: "vertical"
 *               gain:
 *                 type: number
 *                 format: float
 *                 example: 16
 *               towerId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Sector actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sector'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Sector o torre no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Eliminar un sector
 *     tags: [Sectores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del sector
 *     responses:
 *       200:
 *         description: Sector eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sector eliminado exitosamente"
 *       404:
 *         description: Sector no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: No se puede eliminar el sector porque tiene clientes asociados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, getSectorById);
router.put("/:id", [authMiddleware, adminMiddleware], updateSector);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteSector);

module.exports = router;
