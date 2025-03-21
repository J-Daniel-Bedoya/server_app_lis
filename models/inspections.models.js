const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Inspection = sequelize.define('inspections', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  installationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'installation_id'
  },
  technicianId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'technician_id'
  },
  inspectionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'inspection_date'
  },
  status: {
    type: DataTypes.ENUM('ok', 'issues', 'critical'),
    allowNull: false,
    defaultValue: 'ok'
  },
  signalStrength: {
    type: DataTypes.FLOAT,
    field: 'signal_strength'
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'observations'
  },
  recommendations: {
    type: DataTypes.TEXT,
    field: 'recommendations'
  },
  nextInspectionDate: {
    type: DataTypes.DATE,
    field: 'next_inspection_date'
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Inspection;
