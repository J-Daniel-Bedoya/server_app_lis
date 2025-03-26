const ServiceType = require('../models/serviceType.models');

class ServiceTypeService {
  async findAll() {
    return await ServiceType.findAll();
  }

  async findById(id) {
    const serviceType = await ServiceType.findByPk(id);
    if (!serviceType) {
      throw new Error('Tipo de servicio no encontrado');
    }
    return serviceType;
  }

  async create(data) {
    const { name, description } = data;
    
    if (!name) {
      throw new Error('El nombre es requerido');
    }

    const existingType = await ServiceType.findOne({ where: { name } });
    if (existingType) {
      throw new Error('Ya existe un tipo de servicio con ese nombre');
    }

    return await ServiceType.create({ name, description });
  }

  async update(id, data) {
    const { name, description } = data;
    const serviceType = await this.findById(id);

    if (name && name !== serviceType.name) {
      const existingType = await ServiceType.findOne({ where: { name } });
      if (existingType) {
        throw new Error('Ya existe un tipo de servicio con ese nombre');
      }
    }

    await serviceType.update({ name, description });
    return serviceType;
  }

  async remove(id) {
    const serviceType = await this.findById(id);
    
    // Verificar si hay instalaciones usando este tipo de servicio
    const installations = await serviceType.getInstallations();
    if (installations.length > 0) {
      throw new Error('No se puede eliminar el tipo de servicio porque tiene instalaciones asociadas');
    }

    await serviceType.destroy();
  }
}

module.exports = new ServiceTypeService();
