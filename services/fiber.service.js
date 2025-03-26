const { Fiber, Area, Nap, Vlan } = require("../models");

class FiberService {
  async getAllFibers() {
    return Fiber.findAll({
      include: [
        { model: Area, attributes: ["id", "name"] },
        { model: Vlan, attributes: ["id", "name"] },
        { model: Nap, attributes: ["id", "number"] },
      ],
    });
  }

  async getFiberById(id) {
    const fiber = await Fiber.findByPk(id, {
      include: [
        { model: Area, attributes: ["id", "name"] },
        { model: Vlan, attributes: ["id", "name"] },
        { model: Nap, attributes: ["id", "number"] },
      ],
    });
    if (!fiber) {
      throw new Error("Fiber not found");
    }
    return fiber;
  }

  async createFiber(fiberData) {
    // Verificar que el área existe
    const area = await Area.findByPk(fiberData.areaId);
    if (!area) {
      throw new Error("Area not found");
    }

    // Validar la configuración de red
    this._validateNetworkConfig(fiberData);

    return Fiber.create(fiberData);
  }

  async updateFiber(id, fiberData) {
    const fiber = await Fiber.findByPk(id);
    if (!fiber) {
      throw new Error("Fiber not found");
    }

    // Si se está actualizando el área, verificar que existe
    if (fiberData.areaId) {
      const area = await Area.findByPk(fiberData.areaId);
      if (!area) {
        throw new Error("Area not found");
      }
    }

    // Validar la configuración de red si se está actualizando
    if (fiberData.subnetMask || fiberData.gateway) {
      this._validateNetworkConfig({
        ...fiber.toJSON(),
        ...fiberData,
      });
    }

    await fiber.update(fiberData);
    return fiber;
  }

  async deleteFiber(id) {
    const fiber = await Fiber.findByPk(id);
    if (!fiber) {
      throw new Error("Fiber not found");
    }

    // Verificar si hay NAPs asociados
    const napCount = await Nap.count({ where: { fiberId: id } });
    if (napCount > 0) {
      throw new Error("Cannot delete fiber with associated NAPs");
    }

    await fiber.destroy();
  }

  _validateNetworkConfig(data) {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // Validar máscara de subred
    if (data.subnetMask && !ipv4Regex.test(data.subnetMask)) {
      throw new Error("Invalid subnet mask format");
    }

    // Validar gateway
    if (data.gateway && !ipv4Regex.test(data.gateway)) {
      throw new Error("Invalid gateway format");
    }
  }
}

module.exports = new FiberService();
