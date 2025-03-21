const { Tower, Area, Sector } = require("../models");

class TowerService {
  async getAllTowers() {
    return Tower.findAll({
      include: [
        { model: Area, attributes: ["id", "name"] },
        { model: Sector, attributes: ["id", "name"] },
      ],
    });
  }

  async getTowerById(id) {
    const tower = await Tower.findByPk(id, {
      include: [
        { model: Area, attributes: ["id", "name"] },
        { model: Sector, attributes: ["id", "name"] },
      ],
    });
    if (!tower) {
      throw new Error("Tower not found");
    }
    return tower;
  }

  async createTower(towerData) {
    // Verificar que el área existe
    const area = await Area.findByPk(towerData.areaId);
    if (!area) {
      throw new Error("Area not found");
    }
    return Tower.create(towerData);
  }

  async updateTower(id, towerData) {
    const tower = await Tower.findByPk(id);
    if (!tower) {
      throw new Error("Tower not found");
    }

    // Si se está actualizando el área, verificar que existe
    if (towerData.areaId) {
      const area = await Area.findByPk(towerData.areaId);
      if (!area) {
        throw new Error("Area not found");
      }
    }

    await tower.update(towerData);
    return tower;
  }

  async deleteTower(id) {
    const tower = await Tower.findByPk(id);
    if (!tower) {
      throw new Error("Tower not found");
    }

    // Verificar si hay sectores asociados
    const sectorCount = await Sector.count({ where: { towerId: id } });
    if (sectorCount > 0) {
      throw new Error("Cannot delete tower with associated sectors");
    }

    await tower.destroy();
  }
}

module.exports = new TowerService();
