const inspectionsService = require('../services/inspections.service');
const { handleHttpError } = require('../utils/errorHandler');

class InspectionsController {
  async createInspection(req, res) {
    try {
      const inspectionData = {
        ...req.body,
        technicianId: req.user.id // Del token JWT
      };

      const inspection = await inspectionsService.createInspection(inspectionData);
      
      res.status(201).json({
        success: true,
        data: inspection
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async getRecentInspections(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const inspections = await inspectionsService.getRecentInspections(limit);
      
      res.json({
        success: true,
        data: inspections
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async getInspectionById(req, res) {
    try {
      const { id } = req.params;
      const inspection = await inspectionsService.getInspectionById(id);
      
      if (!inspection) {
        return res.status(404).json({
          success: false,
          error: 'Revisión no encontrada'
        });
      }

      res.json({
        success: true,
        data: inspection
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async getInspectionsByInstallation(req, res) {
    try {
      const { installationId } = req.params;
      const inspections = await inspectionsService.getInspectionsByInstallation(installationId);
      
      res.json({
        success: true,
        data: inspections
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async updateInspection(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const inspection = await inspectionsService.updateInspection(id, updateData);

      res.json({
        success: true,
        data: inspection
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }
}

module.exports = new InspectionsController();
