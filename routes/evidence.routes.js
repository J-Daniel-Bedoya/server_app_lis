const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { evidenceController: { 
  getAllEvidence, 
  getEvidenceById, 
  createEvidence, 
  updateEvidence, 
  deleteEvidence,
  uploadImages
} } = require('../controllers');

router.get('/', getAllEvidence);
router.get('/:id', getEvidenceById);
router.post('/', authMiddleware, createEvidence);
router.put('/:id', authMiddleware, updateEvidence);
router.delete('/:id', authMiddleware, deleteEvidence);
router.post('/:id/images', authMiddleware, uploadImages);

module.exports = router;
