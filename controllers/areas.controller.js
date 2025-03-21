const { areaService } = require('../services');

const getAllAreas = async (req, res) => {
  try {
    const areas = await areaService.getAllAreas();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAreaById = async (req, res) => {
  try {
    const area = await areaService.getAreaById(req.params.id);
    res.json(area);
  } catch (error) {
    if (error.message === 'Area not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createArea = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const area = await areaService.createArea(req.body);
    res.status(201).json(area);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArea = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const area = await areaService.updateArea(req.params.id, req.body);
    res.json(area);
  } catch (error) {
    if (error.message === 'Area not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteArea = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await areaService.deleteArea(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Area not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Cannot delete area with associated towers or fibers') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea
};
