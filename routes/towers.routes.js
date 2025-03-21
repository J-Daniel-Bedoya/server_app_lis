const express = require("express");
const router = express.Router();
const {
  towerController: { getAllTowers, getTowerById, createTower, updateTower, deleteTower },
} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

/**
 * @swagger
 * /api/v1/towers:
 *   get:
 *     summary: Obtener todas las torres
 *     tags: [Torres]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de torres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tower'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Crear una nueva torre
 *     tags: [Torres]
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
 *                 example: "Torre Principal"
 *               description:
 *                 type: string
 *                 example: "Torre principal de distribución"
 *               latitude:
 *                 type: number
 *                 format: float
 *                 example: 19.4326
 *               longitude:
 *                 type: number
 *                 format: float
 *                 example: -99.1332
 *               height:
 *                 type: number
 *                 format: float
 *                 example: 30.5
 *               areaId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *               - height
 *               - areaId
 *     responses:
 *       201:
 *         description: Torre creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tower'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Área no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", authMiddleware, getAllTowers);
router.post("/", [authMiddleware, adminMiddleware], createTower);

/**
 * @swagger
 * /api/v1/towers/{id}:
 *   get:
 *     summary: Obtener una torre por ID
 *     tags: [Torres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la torre
 *     responses:
 *       200:
 *         description: Torre encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tower'
 *       404:
 *         description: Torre no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Actualizar una torre
 *     tags: [Torres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la torre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Torre Principal"
 *               description:
 *                 type: string
 *                 example: "Torre principal de distribución"
 *               latitude:
 *                 type: number
 *                 format: float
 *                 example: 19.4326
 *               longitude:
 *                 type: number
 *                 format: float
 *                 example: -99.1332
 *               height:
 *                 type: number
 *                 format: float
 *                 example: 30.5
 *               areaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Torre actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tower'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Torre o área no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Eliminar una torre
 *     tags: [Torres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la torre
 *     responses:
 *       200:
 *         description: Torre eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Torre eliminada exitosamente"
 *       404:
 *         description: Torre no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: No se puede eliminar la torre porque tiene sectores asociados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, getTowerById);
router.put("/:id", [authMiddleware, adminMiddleware], updateTower);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteTower);

module.exports = router;
