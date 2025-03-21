const { DataTypes } = require('sequelize');
const { db } = require('../utils/db');

const Installation = db.define('installations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  areaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'areas',
      key: 'id'
    }
  },
  fiberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fiber',
      key: 'id'
    }
  },
  napId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'naps',
      key: 'id'
    }
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Número de cédula del cliente'
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIP: true
    }
  },
  macAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    references: {
      model: 'users',
      key: 'id'
    }
  },
  installationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

// Asociaciones
Installation.associate = (models) => {
  Installation.belongsTo(models.areas, { foreignKey: 'areaId' });
  Installation.belongsTo(models.fiber, { foreignKey: 'fiberId' });
  Installation.belongsTo(models.naps, { foreignKey: 'napId' });
  Installation.belongsTo(models.users, { 
    foreignKey: 'technicianId',
    as: 'technician'
  });
  Installation.hasMany(models.evidence, { 
    foreignKey: 'installationId',
    as: 'evidence'
  });
};

module.exports = Installation;
