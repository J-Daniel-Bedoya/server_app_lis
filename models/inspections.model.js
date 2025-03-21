const { DataTypes } = require('sequelize');
const { db } = require('../utils/db');

const Inspection = db.define('inspections', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  installationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'installations',
      key: 'id'
    }
  },
  technicianId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  inspectionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('ok', 'issues', 'critical'),
    allowNull: false,
    defaultValue: 'ok'
  },
  signalStrength: {
    type: DataTypes.INTEGER,
    validate: {
      min: -100,
      max: 0
    }
  },
  bandwidth: {
    type: DataTypes.FLOAT,
    comment: 'Velocidad medida en Mbps'
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  recommendations: {
    type: DataTypes.TEXT
  },
  nextInspectionDate: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true
});

// Asociaciones
Inspection.associate = (models) => {
  Inspection.belongsTo(models.installations, { 
    foreignKey: 'installationId',
    as: 'installation'
  });
  Inspection.belongsTo(models.users, { 
    foreignKey: 'technicianId',
    as: 'technician'
  });
  Inspection.hasMany(models.evidence, {
    foreignKey: 'inspectionId',
    as: 'evidence'
  });
};

module.exports = Inspection;
