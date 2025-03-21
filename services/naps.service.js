const { Nap, Fiber, Client } = require("../models");

class NapService {
  async getAllNaps() {
    return Nap.findAll({
      include: [
        { model: Fiber, attributes: ["id", "name"] },
        { model: Client, attributes: ["id", "name"] },
      ],
    });
  }

  async getNapById(id) {
    const nap = await Nap.findByPk(id, {
      include: [
        { model: Fiber, attributes: ["id", "name"] },
        { model: Client, attributes: ["id", "name"] },
      ],
    });
    if (!nap) {
      throw new Error("NAP not found");
    }
    return nap;
  }

  async createNap(napData) {
    // Verificar que la fibra existe
    const fiber = await Fiber.findByPk(napData.fiberId);
    if (!fiber) {
      throw new Error("Fiber not found");
    }
    return Nap.create(napData);
  }

  async updateNap(id, napData) {
    const nap = await Nap.findByPk(id);
    if (!nap) {
      throw new Error("NAP not found");
    }

    // Si se está actualizando la fibra, verificar que existe
    if (napData.fiberId) {
      const fiber = await Fiber.findByPk(napData.fiberId);
      if (!fiber) {
        throw new Error("Fiber not found");
      }
    }

    await nap.update(napData);
    return nap;
  }

  async deleteNap(id) {
    const nap = await Nap.findByPk(id);
    if (!nap) {
      throw new Error("NAP not found");
    }

    // Verificar si hay clientes asociados
    const clientCount = await Client.count({ where: { napId: id } });
    if (clientCount > 0) {
      throw new Error("Cannot delete NAP with associated clients");
    }

    await nap.destroy();
  }
}

module.exports = new NapService();
