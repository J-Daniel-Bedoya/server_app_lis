const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
  fiberController: {
    getAllFibers,
    getFiberById,
    createFiber,
    updateFiber,
    deleteFiber,
  },
} = require("../controllers");

router.get("/", authMiddleware, getAllFibers);
router.get("/:id", authMiddleware, getFiberById);
router.post("/", authMiddleware, createFiber);
router.put("/:id", authMiddleware, updateFiber);
router.delete("/:id", authMiddleware, deleteFiber);

module.exports = router;
