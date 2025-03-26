const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const ServiceType = sequelize.define('service_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.ENUM('Fibra', 'Antena'),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = ServiceType;
