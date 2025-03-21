const Area = require('./area.models');
const Tower = require('./towers.models');
const Sector = require('./sectors.models');
const Fiber = require('./fiber.models');
const Nap = require('./naps.models');
const Evidence = require('./evidence.models');
const EvidenceImage = require('./evidence_images.models');
const User = require('./users.models');
const Installation = require('./installations.models');
const Inspection = require('./inspections.models');

const initModels = () => {
  // Relaciones de Area
  Area.hasMany(Tower, { foreignKey: 'area_id' });
  Area.hasMany(Fiber, { foreignKey: 'area_id' });
  
  // Relaciones de Torre
  Tower.belongsTo(Area, { foreignKey: 'area_id' });
  Tower.hasMany(Sector, { foreignKey: 'tower_id' });
  
  // Relaciones de Sector
  Sector.belongsTo(Tower, { foreignKey: 'tower_id' });
  Sector.hasMany(Installation, { foreignKey: 'sector_id' });
  
  // Relaciones de Fibra
  Fiber.belongsTo(Area, { foreignKey: 'area_id' });
  Fiber.hasMany(Nap, { foreignKey: 'fiber_id' });
  
  // Relaciones de NAP
  Nap.belongsTo(Fiber, { foreignKey: 'fiber_id' });
  Nap.hasMany(Installation, { foreignKey: 'nap_id' });
  
  // Relaciones de Installation
  Installation.belongsTo(Sector, { foreignKey: 'sector_id' });
  Installation.belongsTo(Nap, { foreignKey: 'nap_id' });
  Installation.hasMany(Evidence, { foreignKey: 'installation_id' });
  Installation.hasMany(Inspection, { foreignKey: 'installation_id' });
  Installation.belongsTo(User, {
    as: 'technician',
    foreignKey: 'technician_id',
    scope: {
      role: 'technician'
    }
  });
  
  // Relaciones de Inspection
  Inspection.belongsTo(Installation, { foreignKey: 'installation_id' });
  Inspection.belongsTo(User, {
    as: 'inspector',
    foreignKey: 'inspector_id',
    scope: {
      role: 'technician'
    }
  });
  Inspection.hasMany(Evidence, { foreignKey: 'inspection_id' });
  
  // Relaciones de Usuario
  User.hasMany(Installation, {
    as: 'assignedInstallations',
    foreignKey: 'technician_id'
  });
  User.hasMany(Inspection, {
    as: 'performedInspections',
    foreignKey: 'inspector_id'
  });
  
  // Relaciones de Evidencia
  Evidence.belongsTo(Installation, { foreignKey: 'installation_id' });
  Evidence.belongsTo(Inspection, { foreignKey: 'inspection_id' });
  Evidence.hasMany(EvidenceImage, { foreignKey: 'evidence_id' });
  
  // Relaciones de Imágenes de Evidencia
  EvidenceImage.belongsTo(Evidence, { foreignKey: 'evidence_id' });
};

module.exports = initModels;