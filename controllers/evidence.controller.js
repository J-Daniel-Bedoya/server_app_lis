const { evidenceService } = require('../services');

const getAllEvidence = async (req, res) => {
  try {
    const evidence = await evidenceService.getAllEvidence();
    res.json(evidence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvidenceById = async (req, res) => {
  try {
    const evidence = await evidenceService.getEvidenceById(req.params.id);
    res.json(evidence);
  } catch (error) {
    if (error.message === 'Evidence not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createEvidence = async (req, res) => {
  try {
    if (!req.user.role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const evidence = await evidenceService.createEvidence({
      ...req.body,
      created_by: req.user.id
    });
    res.status(201).json(evidence);
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Invalid')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const updateEvidence = async (req, res) => {
  try {
    const evidence = await evidenceService.getEvidenceById(req.params.id);
    
    if (evidence.created_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedEvidence = await evidenceService.updateEvidence(req.params.id, req.body);
    res.json(updatedEvidence);
  } catch (error) {
    if (error.message === 'Evidence not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Invalid')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const deleteEvidence = async (req, res) => {
  try {
    const evidence = await evidenceService.getEvidenceById(req.params.id);
    
    if (evidence.created_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await evidenceService.deleteEvidence(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Evidence not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const uploadImages = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ message: 'No images provided' });
    }

    const evidenceId = req.params.id;
    const evidence = await evidenceService.getEvidenceById(evidenceId);
    
    if (evidence.created_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const images = await evidenceService.uploadImages(evidenceId, req.files);
    res.status(201).json(images);
  } catch (error) {
    if (error.message === 'Evidence not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Invalid')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllEvidence,
  getEvidenceById,
  createEvidence,
  updateEvidence,
  deleteEvidence,
  uploadImages
};
