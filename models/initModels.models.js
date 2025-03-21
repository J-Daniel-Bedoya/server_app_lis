const User = require('./users.models');
const Area = require('./areas.models');
const Tower = require('./towers.models');
const Fiber = require('./fiber.models');
const Sector = require('./sectors.models');
const Nap = require('./naps.models');
const Evidence = require('./evidence.models');
const EvidenceImage = require('./evidence_images.models');
const Installation = require('./installations.models');
const Inspection = require('./inspections.models');

const initModels = (sequelize) => {
  // 1. Jerarquía de Infraestructura
  // 1.1 Área (Nivel superior)
  Area.hasMany(Tower, { foreignKey: 'area_id' });
  Area.hasMany(Fiber, { foreignKey: 'area_id' });
  Area.hasMany(Installation, { foreignKey: 'area_id' });

  // 1.2 Torre
  Tower.belongsTo(Area, { foreignKey: 'area_id' });
  Tower.hasMany(Sector, { foreignKey: 'tower_id' });

  // 1.3 Sector
  Sector.belongsTo(Tower, { foreignKey: 'tower_id' });
  Sector.hasMany(Installation, { foreignKey: 'sector_id' });

  // 1.4 Fibra
  Fiber.belongsTo(Area, { foreignKey: 'area_id' });
  Fiber.hasMany(Nap, { foreignKey: 'fiber_id' });
  Fiber.hasMany(Installation, { foreignKey: 'fiber_id' });

  // 1.5 NAP
  Nap.belongsTo(Fiber, { foreignKey: 'fiber_id' });
  Nap.hasMany(Installation, { foreignKey: 'nap_id' });

  // 2. Instalaciones y sus relaciones
  // 2.1 Instalación (Centro del sistema)
  Installation.belongsTo(Area, { foreignKey: 'area_id' });
  Installation.belongsTo(Sector, { foreignKey: 'sector_id' });
  Installation.belongsTo(Fiber, { foreignKey: 'fiber_id' });
  Installation.belongsTo(Nap, { foreignKey: 'nap_id' });
  Installation.belongsTo(User, {
    foreignKey: 'technician_id',
    as: 'technician'
  });
  Installation.hasMany(Evidence, {
    foreignKey: 'installation_id',
    as: 'evidence'
  });
  Installation.hasMany(Inspection, {
    foreignKey: 'installation_id',
    as: 'inspections'
  });

  // 2.2 Inspección
  Inspection.belongsTo(Installation, {
    foreignKey: 'installation_id',
    as: 'installation'
  });
  Inspection.belongsTo(User, {
    foreignKey: 'technician_id',
    as: 'inspector'
  });
  Inspection.hasMany(Evidence, {
    foreignKey: 'inspection_id',
    as: 'evidence'
  });

  // 3. Sistema de Evidencias
  // 3.1 Evidencia
  Evidence.belongsTo(Installation, {
    foreignKey: 'installation_id',
    as: 'installation'
  });
  Evidence.belongsTo(Inspection, {
    foreignKey: 'inspection_id',
    as: 'inspection'
  });
  Evidence.belongsTo(User, {
    foreignKey: 'uploaded_by',
    as: 'uploader'
  });
  Evidence.hasMany(EvidenceImage, {
    foreignKey: 'evidence_id',
    as: 'images'
  });

  // 3.2 Imágenes de Evidencia
  EvidenceImage.belongsTo(Evidence, {
    foreignKey: 'evidence_id',
    as: 'evidence'
  });
  EvidenceImage.belongsTo(User, {
    foreignKey: 'uploaded_by',
    as: 'uploader'
  });

  // 4. Relaciones de Usuario
  // 4.1 Usuario con sus roles
  User.hasMany(Installation, {
    as: 'assignedInstallations',
    foreignKey: 'technician_id'
  });
  User.hasMany(Inspection, {
    as: 'performedInspections',
    foreignKey: 'technician_id'
  });
  User.hasMany(Evidence, {
    as: 'uploadedEvidence',
    foreignKey: 'uploaded_by'
  });
  User.hasMany(EvidenceImage, {
    as: 'uploadedImages',
    foreignKey: 'uploaded_by'
  });
};

module.exports = initModels;