const { fiberService } = require('../services');

const getAllFibers = async (req, res) => {
  try {
    const fibers = await fiberService.getAllFibers();
    res.json(fibers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFiberById = async (req, res) => {
  try {
    const fiber = await fiberService.getFiberById(req.params.id);
    res.json(fiber);
  } catch (error) {
    if (error.message === 'Fiber not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createFiber = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const fiber = await fiberService.createFiber(req.body);
    res.status(201).json(fiber);
  } catch (error) {
    if (error.message === 'Area not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Invalid')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const updateFiber = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const fiber = await fiberService.updateFiber(req.params.id, req.body);
    res.json(fiber);
  } catch (error) {
    if (error.message === 'Fiber not found' || error.message === 'Area not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Invalid')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const deleteFiber = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await fiberService.deleteFiber(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Fiber not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Cannot delete fiber with associated NAPs') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllFibers,
  getFiberById,
  createFiber,
  updateFiber,
  deleteFiber
};
