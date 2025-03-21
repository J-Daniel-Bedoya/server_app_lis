const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  clientController: {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
  },
} = require("../controllers");

router.get("/", authMiddleware, getAllClients);
router.get("/:id", authMiddleware, getClientById);
router.post("/", authMiddleware, createClient);
router.put("/:id", authMiddleware, updateClient);
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;
