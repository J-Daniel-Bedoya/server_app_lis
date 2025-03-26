const { customerService } = require('../services');

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.findAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(customer);
  } catch (error) {
    if (error.message === 'Cliente no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

const getCustomerByDni = async (req, res, next) => {
  try {
    const { dni } = req.params;
    const customer = await customerService.findByDni(dni);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(customer);
  } catch (error) {
    if (error.message === 'Cliente no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    if (error.message.includes('Ya existe') || 
        error.message.includes('DNI') || 
        error.message.includes('teléfono')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.update(id, req.body);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(customer);
  } catch (error) {
    if (error.message === 'Cliente no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Ya existe') || 
        error.message.includes('DNI') || 
        error.message.includes('teléfono')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    await customerService.remove(id);
    res.status(204).end();
  } catch (error) {
    if (error.message === 'Cliente no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('tiene instalaciones')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  getCustomerByDni,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
