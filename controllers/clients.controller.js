const { clientService } = require('../services');

const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    res.json(client);
  } catch (error) {
    if (error.message === 'Client not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createClient = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
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

const updateClient = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const client = await clientService.updateClient(req.params.id, req.body);
    res.json(client);
  } catch (error) {
    if (error.message === 'Client not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Invalid')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const deleteClient = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    await clientService.deleteClient(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Client not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('evidence')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
