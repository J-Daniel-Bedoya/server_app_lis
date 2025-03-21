const express = require("express");
const router = express.Router();
const {
  fiberController: { getAllFibers, getFiberById, createFiber, updateFiber, deleteFiber },
} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

/**
 * @swagger
 * /api/v1/fiber:
 *   get:
 *     summary: Obtener todas las fibras
 *     tags: [Fibra]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fibras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fiber'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Crear una nueva fibra
 *     tags: [Fibra]
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
 *                 example: "Fibra Principal"
 *               description:
 *                 type: string
 *                 example: "Fibra principal para distribución"
 *               type:
 *                 type: string
 *                 enum: [aerial, underground]
 *                 example: "aerial"
 *               capacity:
 *                 type: integer
 *                 example: 24
 *               length:
 *                 type: number
 *                 format: float
 *                 example: 1500.5
 *               areaId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - name
 *               - type
 *               - capacity
 *               - length
 *               - areaId
 *     responses:
 *       201:
 *         description: Fibra creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fiber'
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
router.get("/", authMiddleware, getAllFibers);
router.post("/", [authMiddleware, adminMiddleware], createFiber);

/**
 * @swagger
 * /api/v1/fiber/{id}:
 *   get:
 *     summary: Obtener una fibra por ID
 *     tags: [Fibra]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fibra
 *     responses:
 *       200:
 *         description: Fibra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fiber'
 *       404:
 *         description: Fibra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Actualizar una fibra
 *     tags: [Fibra]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fibra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fibra Principal"
 *               description:
 *                 type: string
 *                 example: "Fibra principal para distribución"
 *               type:
 *                 type: string
 *                 enum: [aerial, underground]
 *                 example: "aerial"
 *               capacity:
 *                 type: integer
 *                 example: 24
 *               length:
 *                 type: number
 *                 format: float
 *                 example: 1500.5
 *               areaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Fibra actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fiber'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Fibra o área no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Eliminar una fibra
 *     tags: [Fibra]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fibra
 *     responses:
 *       200:
 *         description: Fibra eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fibra eliminada exitosamente"
 *       404:
 *         description: Fibra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: No se puede eliminar la fibra porque tiene NAPs asociados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, getFiberById);
router.put("/:id", [authMiddleware, adminMiddleware], updateFiber);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteFiber);

module.exports = router;
