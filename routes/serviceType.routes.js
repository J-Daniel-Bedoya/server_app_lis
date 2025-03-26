const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  getAllServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType,
} = require("../controllers/serviceType.controller");

const router = Router();

router.get("/", authMiddleware, getAllServiceTypes);
router.get("/:id", authMiddleware, getServiceTypeById);
router.post("/", [authMiddleware, adminMiddleware], createServiceType);
router.put("/:id", [authMiddleware, adminMiddleware], updateServiceType);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteServiceType);

module.exports = router;
