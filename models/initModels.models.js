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
  // Relaciones de Area
  Area.hasMany(Tower, { foreignKey: 'area_id' });
  Area.hasMany(Fiber, { foreignKey: 'area_id' });
  Area.hasMany(Installation, { foreignKey: 'area_id' });

  // Relaciones de Torre
  Tower.belongsTo(Area, { foreignKey: 'area_id' });
  Tower.hasMany(Sector, { foreignKey: 'tower_id' });

  // Relaciones de Sector
  Sector.belongsTo(Tower, { foreignKey: 'tower_id' });
  Sector.hasMany(Installation, { foreignKey: 'sector_id' });

  // Relaciones de Fibra
  Fiber.belongsTo(Area, { foreignKey: 'area_id' });
  Fiber.hasMany(Nap, { foreignKey: 'fiber_id' });
  Fiber.hasMany(Installation, { foreignKey: 'fiber_id' });

  // Relaciones de NAP
  Nap.belongsTo(Fiber, { foreignKey: 'fiber_id' });
  Nap.hasMany(Installation, { foreignKey: 'nap_id' });

  // Relaciones de Installation
  Installation.belongsTo(Area, {
    foreignKey: 'area_id'
  });
  Installation.belongsTo(Fiber, {
    foreignKey: 'fiber_id'
  });
  Installation.belongsTo(Nap, {
    foreignKey: 'nap_id'
  });
  Installation.belongsTo(Sector, {
    foreignKey: 'sector_id'
  });
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

  // Relaciones de Inspection
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

  // Relaciones de Evidence
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

  // Relaciones de EvidenceImage
  EvidenceImage.belongsTo(Evidence, {
    foreignKey: 'evidence_id',
    as: 'evidence'
  });
  EvidenceImage.belongsTo(User, {
    foreignKey: 'uploaded_by',
    as: 'uploader'
  });

  // Relaciones de Usuario
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