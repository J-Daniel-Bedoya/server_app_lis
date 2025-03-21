const { sequelize } = require('../utils/db');
const { Inspection, Installation, User, Evidence } = require('../models');

class InspectionsService {
  async createInspection(inspectionData) {
    const {
      installationId,
      technicianId,
      status,
      signalStrength,
      bandwidth,
      observations,
      recommendations,
      nextInspectionDate,
      evidenceUrls
    } = inspectionData;

    // Verificar que la instalación existe
    const installation = await Installation.findByPk(installationId);
    if (!installation) {
      throw new Error('Instalación no encontrada');
    }

    // Crear la revisión
    const inspection = await Inspection.create({
      installationId,
      technicianId,
      status,
      signalStrength,
      bandwidth,
      observations,
      recommendations,
      nextInspectionDate,
      inspectionDate: new Date()
    });

    // Crear registros de evidencia si se proporcionaron
    if (evidenceUrls && evidenceUrls.length > 0) {
      await Evidence.bulkCreate(
        evidenceUrls.map(url => ({
          inspectionId: inspection.id,
          imageUrl: url,
          uploadedBy: technicianId,
          type: 'inspection'
        }))
      );
    }

    return inspection;
  }

  async getRecentInspections(limit = 10) {
    return Inspection.findAll({
      limit,
      order: [['inspectionDate', 'DESC']],
      include: [
        { 
          model: Installation,
          attributes: ['id', 'clientName', 'ipAddress']
        },
        {
          model: User,
          as: 'inspector',
          attributes: ['id', 'name']
        },
        {
          model: Evidence,
          attributes: ['id', 'imageUrl']
        }
      ]
    });
  }

  async getInspectionById(id) {
    return Inspection.findByPk(id, {
      include: [
        { 
          model: Installation,
          attributes: ['id', 'clientName', 'ipAddress']
        },
        {
          model: User,
          as: 'inspector',
          attributes: ['id', 'name']
        },
        {
          model: Evidence,
          attributes: ['id', 'imageUrl']
        }
      ]
    });
  }

  async getInspectionsByInstallation(installationId) {
    return Inspection.findAll({
      where: { installationId },
      order: [['inspectionDate', 'DESC']],
      include: [
        {
          model: User,
          as: 'inspector',
          attributes: ['id', 'name']
        },
        {
          model: Evidence,
          attributes: ['id', 'imageUrl']
        }
      ]
    });
  }

  async updateInspectionStatus(id, status) {
    const inspection = await Inspection.findByPk(id);
    
    if (!inspection) {
      throw new Error('Revisión no encontrada');
    }

    await inspection.update({ status });
    return inspection;
  }
}

module.exports = new InspectionsService();
