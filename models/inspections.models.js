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
    field: 'installation_id',
    references: {
      model: 'installations',
      key: 'id'
    }
  },
  inspectionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'inspection_date',
    defaultValue: DataTypes.NOW
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  equipmentChanged: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'equipment_changed',
    defaultValue: false
  },
  changedEquipmentDetails: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'changed_equipment_details'
  },
  signalPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'signal_photo',
    comment: 'Path de la nueva foto de señal (Antena)'
  },
  powerPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'power_photo',
    comment: 'Path de la nueva foto de potencia (Fibra)'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    comment: 'Usuario administrador que realizó la revisión'
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Inspection;
