const { napService } = require('../services');

const getAllNaps = async (req, res) => {
  try {
    const naps = await napService.getAllNaps();
    res.json(naps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNapById = async (req, res) => {
  try {
    const nap = await napService.getNapById(req.params.id);
    res.json(nap);
  } catch (error) {
    if (error.message === 'NAP not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createNap = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const nap = await napService.createNap(req.body);
    res.status(201).json(nap);
  } catch (error) {
    if (error.message === 'Fiber not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const updateNap = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const nap = await napService.updateNap(req.params.id, req.body);
    res.json(nap);
  } catch (error) {
    if (error.message === 'NAP not found' || error.message === 'Fiber not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteNap = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await napService.deleteNap(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'NAP not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Cannot delete NAP with associated clients') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllNaps,
  getNapById,
  createNap,
  updateNap,
  deleteNap
};
