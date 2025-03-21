const { Sector, Tower, Client } = require("../models");

class SectorService {
  async getAllSectors() {
    return Sector.findAll({
      include: [
        { model: Tower, attributes: ["id", "name"] },
        { model: Client, attributes: ["id", "name"] },
      ],
    });
  }

  async getSectorById(id) {
    const sector = await Sector.findByPk(id, {
      include: [
        { model: Tower, attributes: ["id", "name"] },
        { model: Client, attributes: ["id", "name"] },
      ],
    });
    if (!sector) {
      throw new Error("Sector not found");
    }
    return sector;
  }

  async createSector(sectorData) {
    // Verificar que la torre existe
    const tower = await Tower.findByPk(sectorData.towerId);
    if (!tower) {
      throw new Error("Tower not found");
    }
    return Sector.create(sectorData);
  }

  async updateSector(id, sectorData) {
    const sector = await Sector.findByPk(id);
    if (!sector) {
      throw new Error("Sector not found");
    }

    // Si se está actualizando la torre, verificar que existe
    if (sectorData.towerId) {
      const tower = await Tower.findByPk(sectorData.towerId);
      if (!tower) {
        throw new Error("Tower not found");
      }
    }

    await sector.update(sectorData);
    return sector;
  }

  async deleteSector(id) {
    const sector = await Sector.findByPk(id);
    if (!sector) {
      throw new Error("Sector not found");
    }

    // Verificar si hay clientes asociados
    const clientCount = await Client.count({ where: { sectorId: id } });
    if (clientCount > 0) {
      throw new Error("Cannot delete sector with associated clients");
    }

    await sector.destroy();
  }
}

module.exports = new SectorService();
