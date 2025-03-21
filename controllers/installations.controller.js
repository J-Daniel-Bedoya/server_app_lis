const installationsService = require('../services/installations.service');
const { handleHttpError } = require('../utils/errorHandler');

const createInstallation = async (req, res) => {
  try {
    const installationData = {
      ...req.body,
      technicianId: req.user.id // Del token JWT
    };

    const installation = await installationsService.createInstallation(installationData);
    
    res.status(201).json({
      success: true,
      data: installation
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getPendingInstallations = async (req, res) => {
  try {
    const installations = await installationsService.getPendingInstallations();
    
    res.json({
      success: true,
      data: installations
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getInstallationById = async (req, res) => {
  try {
    const { id } = req.params;
    const installation = await installationsService.getInstallationById(id);
    
    if (!installation) {
      return res.status(404).json({
        success: false,
        error: 'Instalación no encontrada'
      });
    }

    res.json({
      success: true,
      data: installation
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const updateInstallationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const installation = await installationsService.updateInstallationStatus(
      id,
      status,
      req.user.id
    );

    res.json({
      success: true,
      data: installation
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

module.exports = {
  createInstallation,
  getPendingInstallations,
  getInstallationById,
  updateInstallationStatus
};
