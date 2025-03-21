const { evidenceService } = require('../services');
const { handleHttpError } = require('../utils/errorHandler');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB límite
  }
});

class EvidenceController {
  // Middleware para manejar la subida de archivos
  uploadMiddleware = upload.single('image');

  async getAllEvidence(req, res) {
    try {
      const evidence = await evidenceService.getAllEvidence();
      res.json(evidence);
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async getEvidenceById(req, res) {
    try {
      const { id } = req.params;
      const evidence = await evidenceService.getEvidenceById(id);
      
      if (!evidence) {
        return res.status(404).json({
          success: false,
          error: 'Evidencia no encontrada'
        });
      }

      res.json({
        success: true,
        data: evidence
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async createEvidence(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere una imagen'
        });
      }

      const evidenceData = {
        ...req.body,
        uploadedBy: req.user.id,
        metadata: {
          ...JSON.parse(req.body.metadata || '{}'),
          gpsLocation: req.body.gpsLocation,
          deviceInfo: req.body.deviceInfo
        }
      };

      const evidence = await evidenceService.createEvidence(evidenceData, req.file);
      
      res.status(201).json({
        success: true,
        data: evidence
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async updateEvidence(req, res) {
    try {
      const evidence = await evidenceService.getEvidenceById(req.params.id);
      
      if (evidence.uploadedBy !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Acceso denegado'
        });
      }
      
      const updatedEvidence = await evidenceService.updateEvidence(req.params.id, req.body);
      res.json(updatedEvidence);
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async deleteEvidence(req, res) {
    try {
      const { id } = req.params;
      await evidenceService.deleteEvidence(id);
      
      res.json({
        success: true,
        message: 'Evidencia eliminada correctamente'
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async getEvidenceByInstallation(req, res) {
    try {
      const { installationId } = req.params;
      const evidence = await evidenceService.getEvidenceByInstallation(installationId);
      
      res.json({
        success: true,
        data: evidence
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async getEvidenceByInspection(req, res) {
    try {
      const { inspectionId } = req.params;
      const evidence = await evidenceService.getEvidenceByInspection(inspectionId);
      
      res.json({
        success: true,
        data: evidence
      });
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  async uploadImages(req, res) {
    try {
      if (!req.files || !req.files.length) {
        return res.status(400).json({
          success: false,
          error: 'No se proporcionaron imágenes'
        });
      }

      const evidenceId = req.params.id;
      const evidence = await evidenceService.getEvidenceById(evidenceId);
      
      if (evidence.uploadedBy !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Acceso denegado'
        });
      }

      const images = await evidenceService.uploadImages(evidenceId, req.files);
      res.status(201).json(images);
    } catch (error) {
      handleHttpError(res, error);
    }
  }

  // Validación de tipos de evidencia requeridos
  validateRequiredEvidence(evidenceList, type) {
    const requiredTypes = {
      fiber: ['onu_installation', 'signal_power', 'device_serial'],
      antenna: ['antenna_installation', 'modem', 'signal_power', 'device_serial']
    };

    const required = requiredTypes[type] || [];
    const types = evidenceList.map(e => e.type);
    const missing = required.filter(type => !types.includes(type));

    return {
      isComplete: missing.length === 0,
      missingTypes: missing
    };
  }
}

module.exports = new EvidenceController();
