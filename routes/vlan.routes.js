const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getAllVlans,
  getVlanById,
  createVlan,
  updateVlan,
  deleteVlan
} = require('../controllers/vlan.controller');

const router = Router();

router.get('/', authMiddleware, getAllVlans);
router.get('/:id', authMiddleware, getVlanById);
router.post('/', [authMiddleware, adminMiddleware], createVlan);
router.put('/:id', [authMiddleware, adminMiddleware], updateVlan);
router.delete('/:id', [authMiddleware, adminMiddleware], deleteVlan);

module.exports = router;
