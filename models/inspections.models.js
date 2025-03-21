const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Inspection = sequelize.define('inspections', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  installation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'installations',
      key: 'id'
    }
  },
  technician_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  inspection_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('ok', 'issues', 'critical'),
    allowNull: false,
    defaultValue: 'ok'
  },
  signal_strength: {
    type: DataTypes.FLOAT,
    validate: {
      min: -100,
      max: 0
    }
  },
  bandwidth: {
    type: DataTypes.FLOAT,
    comment: 'Velocidad medida en Mbps',
    field: 'bandwidth'
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
  next_inspection_date: {
    type: DataTypes.DATE,
    field: 'next_inspection_date'
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Inspection;
