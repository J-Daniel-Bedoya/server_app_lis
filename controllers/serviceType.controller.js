const { serviceTypeService } = require('../services');

const getAllServiceTypes = async (req, res, next) => {
  try {
    const serviceTypes = await serviceTypeService.findAll();
    res.json(serviceTypes);
  } catch (error) {
    next(error);
  }
};

const getServiceTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serviceType = await serviceTypeService.findById(id);
    res.json(serviceType);
  } catch (error) {
    if (error.message === 'Tipo de servicio no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

const createServiceType = async (req, res, next) => {
  try {
    const serviceType = await serviceTypeService.create(req.body);
    res.status(201).json(serviceType);
  } catch (error) {
    if (error.message.includes('Ya existe')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const updateServiceType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serviceType = await serviceTypeService.update(id, req.body);
    res.json(serviceType);
  } catch (error) {
    if (error.message === 'Tipo de servicio no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Ya existe')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const deleteServiceType = async (req, res, next) => {
  try {
    const { id } = req.params;
    await serviceTypeService.remove(id);
    res.status(204).end();
  } catch (error) {
    if (error.message === 'Tipo de servicio no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('tiene instalaciones')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getAllServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType
};
