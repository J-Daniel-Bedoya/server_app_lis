const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Customer = sequelize.define('customers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Número de cédula del cliente'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vlanId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'vlan_id',
    references: {
      model: 'vlans',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Customer;
