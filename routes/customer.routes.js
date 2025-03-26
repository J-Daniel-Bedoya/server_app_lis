const { Router } = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  getAllCustomers,
  getCustomerById,
  getCustomerByDni,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customer.controller');

const router = Router();

router.get('/', authMiddleware, getAllCustomers);
router.get('/:id', authMiddleware, getCustomerById);
router.get('/dni/:dni', authMiddleware, getCustomerByDni);
router.post('/', [authMiddleware, adminMiddleware], createCustomer);
router.put('/:id', [authMiddleware, adminMiddleware], updateCustomer);
router.delete('/:id', [authMiddleware, adminMiddleware], deleteCustomer);

module.exports = router;
