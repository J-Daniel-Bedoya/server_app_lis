const { DataTypes } = require('sequelize');
const { db } = require('../utils/db');

const Evidence = db.define('evidence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  installationId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'installations',
      key: 'id'
    }
  },
  inspectionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'inspections',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM(
      'antenna_installation',    // Foto de la antena instalada
      'onu_installation',       // Foto de la ONT/ONU instalada
      'signal_power',           // Foto de la señal/potencia
      'modem',                  // Foto del modem (para antenas)
      'device_serial',          // Foto del S/N o MAC del dispositivo
      'speed_test',            // Foto de prueba de velocidad
      'other'                  // Otras fotos relevantes
    ),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Metadata de la imagen como coordenadas GPS, timestamp, etc.'
  }
}, {
  timestamps: true
});

// Asociaciones
Evidence.associate = (models) => {
  Evidence.belongsTo(models.installations, { 
    foreignKey: 'installationId',
    as: 'installation'
  });
  Evidence.belongsTo(models.inspections, { 
    foreignKey: 'inspectionId',
    as: 'inspection'
  });
  Evidence.belongsTo(models.users, { 
    foreignKey: 'uploadedBy',
    as: 'technician'
  });
};

module.exports = Evidence;
