const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const DeviceIp = sequelize.define('device_ips', {
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
  antennaIp: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'antenna_ip',
    validate: {
      isIP: true
    }
  },
  modemIp: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'modem_ip',
    validate: {
      isIP: true
    }
  },
  onuIp: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'onu_ip',
    validate: {
      isIP: true
    }
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = DeviceIp;
