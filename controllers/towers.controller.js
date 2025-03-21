const { towerService } = require('../services');

const getAllTowers = async (req, res) => {
  try {
    const towers = await towerService.getAllTowers();
    res.json(towers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTowerById = async (req, res) => {
  try {
    const tower = await towerService.getTowerById(req.params.id);
    res.json(tower);
  } catch (error) {
    if (error.message === 'Tower not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createTower = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const tower = await towerService.createTower(req.body);
    res.status(201).json(tower);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTower = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const tower = await towerService.updateTower(req.params.id, req.body);
    res.json(tower);
  } catch (error) {
    if (error.message === 'Tower not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteTower = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await towerService.deleteTower(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Tower not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('associated')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllTowers,
  getTowerById,
  createTower,
  updateTower,
  deleteTower
};
