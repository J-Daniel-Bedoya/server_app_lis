const Customer = require('../models/customer.models');

class CustomerService {
  async findAll() {
    return await Customer.findAll();
  }

  async findById(id) {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
    return customer;
  }

  async findByDni(dni) {
    const customer = await Customer.findOne({ where: { dni } });
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
    return customer;
  }

  async create(data) {
    const { dni, name, phone } = data;
    
    if (!dni || !name) {
      throw new Error('DNI y nombre son requeridos');
    }

    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      throw new Error('El DNI debe tener 8 dígitos numéricos');
    }

    // Validar si ya existe un cliente con ese DNI
    const existingCustomer = await Customer.findOne({ where: { dni } });
    if (existingCustomer) {
      throw new Error('Ya existe un cliente con ese DNI');
    }

    // Validar formato de teléfono (9 dígitos)
    if (phone && !/^\d{9}$/.test(phone)) {
      throw new Error('El teléfono debe tener 9 dígitos numéricos');
    }

    return await Customer.create({ dni, name, phone });
  }

  async update(id, data) {
    const { dni, name, phone } = data;
    const customer = await this.findById(id);

    if (dni && dni !== customer.dni) {
      if (!/^\d{8}$/.test(dni)) {
        throw new Error('El DNI debe tener 8 dígitos numéricos');
      }
      const existingCustomer = await Customer.findOne({ where: { dni } });
      if (existingCustomer) {
        throw new Error('Ya existe un cliente con ese DNI');
      }
    }

    if (phone && !/^\d{9}$/.test(phone)) {
      throw new Error('El teléfono debe tener 9 dígitos numéricos');
    }

    await customer.update({ dni, name, phone });
    return customer;
  }

  async remove(id) {
    const customer = await this.findById(id);
    
    // Verificar si el cliente tiene instalaciones
    const installations = await customer.getInstallations();
    if (installations.length > 0) {
      throw new Error('No se puede eliminar el cliente porque tiene instalaciones asociadas');
    }

    await customer.destroy();
  }
}

module.exports = new CustomerService();
