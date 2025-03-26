const { deviceIpService } = require('../services');

const getDeviceIpById = async (req, res, next) => {
  try {
    const { installationId } = req.params;
    const deviceIp = await deviceIpService.findByInstallationId(installationId);
    res.json(deviceIp);
  } catch (error) {
    if (error.message === 'IPs de dispositivos no encontradas') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

const createDeviceIp = async (req, res, next) => {
  try {
    const deviceIp = await deviceIpService.create(req.body);
    res.status(201).json(deviceIp);
  } catch (error) {
    if (error.message === 'La instalación no existe') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Formato de IP') || 
        error.message.includes('ya están en uso')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const updateDeviceIp = async (req, res, next) => {
  try {
    const { installationId } = req.params;
    const deviceIp = await deviceIpService.update(installationId, req.body);
    res.json(deviceIp);
  } catch (error) {
    if (error.message === 'IPs de dispositivos no encontradas') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Formato de IP') || 
        error.message.includes('ya están en uso')) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getDeviceIpById,
  createDeviceIp,
  updateDeviceIp
};
