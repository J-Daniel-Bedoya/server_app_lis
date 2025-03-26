const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Vlan = sequelize.define('Vlan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fiberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fiber_id',
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ip: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      isIP: true
    }
  },
  mask: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      isIP: true
    }
  },
  gateway: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      isIP: true
    }
  }
}, {
  tableName: 'vlans',
  timestamps: true
});

module.exports = Vlan;
