const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Installation = sequelize.define('installations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  areaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'area_id',
    references: {
      model: 'areas',
      key: 'id'
    }
  },
  fiberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fiber_id',
    references: {
      model: 'fiber',
      key: 'id'
    }
  },
  napId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'nap_id',
    references: {
      model: 'naps',
      key: 'id'
    }
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'client_id',
    comment: 'Número de cédula del cliente'
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'client_name'
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'phone_number'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'ip_address',
    validate: {
      isIP: true
    }
  },
  macAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'mac_address',
    validate: {
      is: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'inProgress', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  technicianId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'technician_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  installationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'installation_date'
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
