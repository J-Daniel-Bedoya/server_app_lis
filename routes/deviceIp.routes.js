const { Router } = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  getDeviceIpById,
  createDeviceIp,
  updateDeviceIp
} = require('../controllers/deviceIp.controller');

const router = Router();

router.get('/:installationId', authMiddleware, getDeviceIpById);
router.post('/', [authMiddleware, adminMiddleware], createDeviceIp);
router.put('/:installationId', [authMiddleware, adminMiddleware], updateDeviceIp);

module.exports = router;
