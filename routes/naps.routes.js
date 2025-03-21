const express = require("express");
const router = express.Router();
const {
  napController: { 
    getAllNaps,
    getNapById,
    createNap,
    updateNap,
    deleteNap
  },
} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

/**
 * @swagger
 * /api/v1/naps:
 *   get:
 *     summary: Obtener todos los NAPs
 *     tags: [NAPs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de NAPs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NAP'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Crear un nuevo NAP
 *     tags: [NAPs]
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
 *                 example: "NAP-001"
 *               description:
 *                 type: string
 *                 example: "NAP ubicado en poste principal"
 *               location:
 *                 type: string
 *                 example: "Poste 123, Calle Principal"
 *               coordinates:
 *                 type: string
 *                 example: "19.4326,-99.1332"
 *               fiberId:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - name
 *               - location
 *               - coordinates
 *               - fiberId
 *     responses:
 *       201:
 *         description: NAP creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NAP'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Fibra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", authMiddleware, getAllNaps);
router.post("/", [authMiddleware, adminMiddleware], createNap);

/**
 * @swagger
 * /api/v1/naps/{id}:
 *   get:
 *     summary: Obtener un NAP por ID
 *     tags: [NAPs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del NAP
 *     responses:
 *       200:
 *         description: NAP encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NAP'
 *       404:
 *         description: NAP no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Actualizar un NAP
 *     tags: [NAPs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del NAP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "NAP-001"
 *               description:
 *                 type: string
 *                 example: "NAP ubicado en poste principal"
 *               location:
 *                 type: string
 *                 example: "Poste 123, Calle Principal"
 *               coordinates:
 *                 type: string
 *                 example: "19.4326,-99.1332"
 *               fiberId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: NAP actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NAP'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: NAP o fibra no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Eliminar un NAP
 *     tags: [NAPs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del NAP
 *     responses:
 *       200:
 *         description: NAP eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "NAP eliminado exitosamente"
 *       404:
 *         description: NAP no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: No se puede eliminar el NAP porque tiene clientes asociados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, getNapById);
router.put("/:id", [authMiddleware, adminMiddleware], updateNap);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteNap);

module.exports = router;
