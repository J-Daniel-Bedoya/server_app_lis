const { sectorService } = require('../services');

const getAllSectors = async (req, res) => {
  try {
    const sectors = await sectorService.getAllSectors();
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSectorById = async (req, res) => {
  try {
    const sector = await sectorService.getSectorById(req.params.id);
    res.json(sector);
  } catch (error) {
    if (error.message === 'Sector not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createSector = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const sector = await sectorService.createSector(req.body);
    res.status(201).json(sector);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSector = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const sector = await sectorService.updateSector(req.params.id, req.body);
    res.json(sector);
  } catch (error) {
    if (error.message === 'Sector not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteSector = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await sectorService.deleteSector(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Sector not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('clients')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector
};
