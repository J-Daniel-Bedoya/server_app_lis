const { vlanService } = require('../services');

const getAllVlans = async (req, res, next) => {
  try {
    const vlans = await vlanService.findAll();
    res.json(vlans);
  } catch (error) {
    next(error);
  }
};

const getVlanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vlan = await vlanService.findById(id);
    res.json(vlan);
  } catch (error) {
    if (error.message === 'VLAN no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

const createVlan = async (req, res, next) => {
  try {
    const vlan = await vlanService.create(req.body);
    res.status(201).json(vlan);
  } catch (error) {
    if (error.message.includes('La fibra especificada no existe')) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Ya existe') || 
        error.message.includes('Formato de')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const updateVlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vlan = await vlanService.update(id, req.body);
    res.json(vlan);
  } catch (error) {
    if (error.message === 'VLAN no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('La fibra especificada no existe')) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Ya existe') || 
        error.message.includes('Formato de')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const deleteVlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    await vlanService.remove(id);
    res.status(204).end();
  } catch (error) {
    if (error.message === 'VLAN no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getAllVlans,
  getVlanById,
  createVlan,
  updateVlan,
  deleteVlan
};
