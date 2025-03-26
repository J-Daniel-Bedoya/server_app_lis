const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Installation = sequelize.define('installations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  serviceTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'service_type_id',
  },
  areaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'area_id',
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'customer_id',
  },
  // Campos para instalaciones de Fibra
  fiberId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'fiber_id',
  },
  napId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'nap_id',
  },
  napPort: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'nap_port'
  },
  onuMac: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'onu_mac',
    validate: {
      is: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    }
  },
  vlanId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'vlan_id',
  },
  // Campos para instalaciones de Antena
  towerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'tower_id',
  },
  sectorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'sector_id',
  },
  antennaMac: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'antenna_mac',
    validate: {
      is: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    }
  },
  modemMac: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'modem_mac',
    validate: {
      is: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    }
  },
  // Campos comunes
  status: {
    type: DataTypes.ENUM('pending', 'inProgress', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  installationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'installation_date',
    defaultValue: DataTypes.NOW
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'completed_at'
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Installation;
