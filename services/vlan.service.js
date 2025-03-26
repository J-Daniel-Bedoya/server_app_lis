const Vlan = require('../models/vlan.models');
const Fiber = require('../models/fiber.models');

class VlanService {
  async findAll() {
    return await Vlan.findAll({
      include: [{
        model: Fiber,
        attributes: ['id', 'name']
      }]
    });
  }

  async findById(id) {
    const vlan = await Vlan.findByPk(id, {
      include: [{
        model: Fiber,
        attributes: ['id', 'name']
      }]
    });
    if (!vlan) {
      throw new Error('VLAN no encontrada');
    }
    return vlan;
  }

  async create(data) {
    const { fiberId, name, ip, mask, gateway } = data;

    // Validar que la fibra existe
    const fiber = await Fiber.findByPk(fiberId);
    if (!fiber) {
      throw new Error('La fibra especificada no existe');
    }

    // Validar formato de IPs
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!ipRegex.test(ip)) {
      throw new Error('Formato de IP inválido');
    }
    if (!ipRegex.test(mask)) {
      throw new Error('Formato de máscara inválido');
    }
    if (!ipRegex.test(gateway)) {
      throw new Error('Formato de gateway inválido');
    }

    // Verificar si ya existe una VLAN con el mismo nombre en la misma fibra
    const existingVlan = await Vlan.findOne({
      where: {
        fiberId,
        name
      }
    });

    if (existingVlan) {
      throw new Error('Ya existe una VLAN con ese nombre en la fibra especificada');
    }

    return await Vlan.create({
      fiberId,
      name,
      ip,
      mask,
      gateway
    });
  }

  async update(id, data) {
    const vlan = await this.findById(id);
    const { name, ip, mask, gateway, fiberId } = data;

    if (fiberId) {
      const fiber = await Fiber.findByPk(fiberId);
      if (!fiber) {
        throw new Error('La fibra especificada no existe');
      }
    }

    // Validar formato de IPs
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (ip && !ipRegex.test(ip)) {
      throw new Error('Formato de IP inválido');
    }
    if (mask && !ipRegex.test(mask)) {
      throw new Error('Formato de máscara inválido');
    }
    if (gateway && !ipRegex.test(gateway)) {
      throw new Error('Formato de gateway inválido');
    }

    // Verificar nombre único en la fibra
    if (name || fiberId) {
      const existingVlan = await Vlan.findOne({
        where: {
          fiberId: fiberId || vlan.fiberId,
          name: name || vlan.name,
          id: { [Op.ne]: id }
        }
      });

      if (existingVlan) {
        throw new Error('Ya existe una VLAN con ese nombre en la fibra especificada');
      }
    }

    await vlan.update({
      name,
      ip,
      mask,
      gateway,
      fiberId
    });

    return vlan;
  }

  async remove(id) {
    const vlan = await this.findById(id);
    await vlan.destroy();
  }
}

module.exports = new VlanService();
