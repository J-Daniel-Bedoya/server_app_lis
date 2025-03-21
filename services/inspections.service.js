const { db } = require('../utils/db');

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
    const installation = await db.installations.findByPk(installationId);
    if (!installation) {
      throw new Error('Instalación no encontrada');
    }

    // Crear la revisión
    const inspection = await db.inspections.create({
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
      await db.evidence.bulkCreate(
        evidenceUrls.map(url => ({
          inspectionId: inspection.id,
          imageUrl: url,
          uploadedBy: technicianId
        }))
      );
    }

    return inspection;
  }

  async getRecentInspections(limit = 10) {
    return db.inspections.findAll({
      include: [
        {
          model: db.installations,
          as: 'installation',
          include: [
            { model: db.areas, attributes: ['name'] }
          ]
        },
        {
          model: db.users,
          as: 'technician',
          attributes: ['name']
        },
        {
          model: db.evidence,
          as: 'evidence'
        }
      ],
      order: [['inspectionDate', 'DESC']],
      limit
    });
  }

  async getInspectionById(id) {
    return db.inspections.findByPk(id, {
      include: [
        {
          model: db.installations,
          as: 'installation',
          include: [
            { model: db.areas, attributes: ['name'] },
            { model: db.naps, attributes: ['name'] }
          ]
        },
        {
          model: db.users,
          as: 'technician',
          attributes: ['name']
        },
        {
          model: db.evidence,
          as: 'evidence'
        }
      ]
    });
  }

  async getInspectionsByInstallation(installationId) {
    return db.inspections.findAll({
      where: { installationId },
      include: [
        {
          model: db.users,
          as: 'technician',
          attributes: ['name']
        },
        {
          model: db.evidence,
          as: 'evidence'
        }
      ],
      order: [['inspectionDate', 'DESC']]
    });
  }

  async updateInspection(id, updateData) {
    const inspection = await db.inspections.findByPk(id);
    if (!inspection) {
      throw new Error('Revisión no encontrada');
    }

    return inspection.update(updateData);
  }
}

module.exports = new InspectionsService();
