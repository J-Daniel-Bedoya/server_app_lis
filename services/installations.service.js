const { db } = require('../utils/db');
const { validateIPAddress, validateMACAddress } = require('../utils/validators');

class InstallationsService {
  async createInstallation(installationData) {
    const {
      areaId,
      fiberId,
      napId,
      ipAddress,
      macAddress,
      clientName,
      clientId,
      phoneNumber,
      evidenceUrls,
      technicianId,
      status = 'pending'
    } = installationData;

    // Validaciones
    if (!validateIPAddress(ipAddress)) {
      throw new Error('Dirección IP inválida');
    }

    if (!validateMACAddress(macAddress)) {
      throw new Error('Dirección MAC inválida');
    }

    // Verificar existencia de relaciones
    const [area, fiber, nap] = await Promise.all([
      db.areas.findByPk(areaId),
      db.fiber.findByPk(fiberId),
      db.naps.findByPk(napId)
    ]);

    if (!area) throw new Error('Área no encontrada');
    if (!fiber) throw new Error('Fibra no encontrada');
    if (!nap) throw new Error('NAP no encontrado');

    // Verificar disponibilidad del NAP
    if (nap.availablePorts <= 0) {
      throw new Error('NAP sin puertos disponibles');
    }

    // Crear la instalación
    const installation = await db.installations.create({
      areaId,
      fiberId,
      napId,
      ipAddress,
      macAddress,
      clientName,
      clientId,
      phoneNumber,
      status,
      technicianId,
      installationDate: new Date(),
    });

    // Crear registros de evidencia
    if (evidenceUrls && evidenceUrls.length > 0) {
      await db.evidence.bulkCreate(
        evidenceUrls.map(url => ({
          installationId: installation.id,
          imageUrl: url,
          uploadedBy: technicianId
        }))
      );
    }

    // Actualizar puertos disponibles en el NAP
    await nap.update({
      availablePorts: nap.availablePorts - 1
    });

    return installation;
  }

  async getPendingInstallations() {
    return db.installations.findAll({
      where: { status: 'pending' },
      include: [
        { model: db.areas, attributes: ['name'] },
        { model: db.users, as: 'technician', attributes: ['name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async getInstallationById(id) {
    return db.installations.findByPk(id, {
      include: [
        { model: db.areas, attributes: ['name'] },
        { model: db.fiber, attributes: ['name', 'type'] },
        { model: db.naps, attributes: ['name', 'location'] },
        { model: db.users, as: 'technician', attributes: ['name'] },
        { model: db.evidence }
      ]
    });
  }

  async updateInstallationStatus(id, status, technicianId) {
    const installation = await db.installations.findByPk(id);
    if (!installation) {
      throw new Error('Instalación no encontrada');
    }

    return installation.update({
      status,
      completedAt: status === 'completed' ? new Date() : null,
      technicianId: status === 'inProgress' ? technicianId : installation.technicianId
    });
  }
}

module.exports = new InstallationsService();
