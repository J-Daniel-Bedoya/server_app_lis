const { Area, Tower, Fiber } = require("../models");

class AreaService {
  async getAllAreas() {
    return Area.findAll({
      include: [
        { model: Tower, attributes: ["id", "name"] },
        { model: Fiber, attributes: ["id", "name", "vlans"] },
      ],
    });
  }

  async getAreaById(id) {
    const area = await Area.findByPk(id, {
      include: [
        { model: Tower, attributes: ["id", "name"] },
        { model: Fiber, attributes: ["id", "name", "vlans"] },
      ],
    });
    if (!area) {
      throw new Error("Area not found");
    }
    return area;
  }

  async createArea(areaData) {
    return Area.create(areaData);
  }

  async updateArea(id, areaData) {
    const area = await Area.findByPk(id);
    if (!area) {
      throw new Error("Area not found");
    }
    await area.update(areaData);
    return area;
  }

  async deleteArea(id) {
    const area = await Area.findByPk(id);
    if (!area) {
      throw new Error("Area not found");
    }

    // Verificar si hay torres o fibras asociadas
    const [towers, fibers] = await Promise.all([
      Tower.count({ where: { area_id: id } }),
      Fiber.count({ where: { area_id: id } }),
    ]);

    if (towers > 0 || fibers > 0) {
      throw new Error("Cannot delete area with associated towers or fibers");
    }

    await area.destroy();
  }
}

module.exports = new AreaService();
