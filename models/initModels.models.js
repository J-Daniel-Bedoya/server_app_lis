const Area = require('./areas.models');
const Tower = require('./towers.models');
const Fiber = require('./fiber.models');
const Sector = require('./sectors.models');
const Nap = require('./naps.models');
const EvidenceImage = require('./evidence_images.models');
const Installation = require('./installations.models');
const Evidence = require('./evidence.models');
const User = require('./users.models');
const ServiceType = require('./serviceType.models');
const Customer = require('./customer.models');
const DeviceIp = require('./deviceIp.models');
const Inspection = require('./inspections.models');
const Vlan = require('./vlan.models');

const initModels = (sequelize) => {
  // Relaciones de Area
  Area.hasMany(Tower, { foreignKey: 'areaId' });
  Area.hasMany(Fiber, { foreignKey: 'areaId' });
  Area.hasMany(Installation, { foreignKey: 'areaId' });

  // Relaciones de Tower
  Tower.belongsTo(Area, { foreignKey: 'areaId' });
  Tower.hasMany(Sector, { foreignKey: 'towerId' });
  Tower.hasMany(Installation, { foreignKey: 'towerId' });

  // Relaciones de Sector
  Sector.belongsTo(Tower, { foreignKey: 'towerId' });
  Sector.hasMany(Installation, { foreignKey: 'sectorId' });

  // Relaciones de Fiber
  Fiber.belongsTo(Area, { foreignKey: 'areaId' });
  Fiber.hasMany(Nap, { foreignKey: 'fiberId' });
  Fiber.hasMany(Installation, { foreignKey: 'fiberId' });
  Fiber.hasMany(Vlan, { foreignKey: 'fiberId', as: 'vlans' });

  // Relaciones de VLAN
  Vlan.belongsTo(Fiber, { foreignKey: 'fiberId', as: 'fiber' });
  Vlan.hasMany(Installation, { foreignKey: 'vlanId', as: 'installations' });

  // Relaciones de NAP
  Nap.belongsTo(Fiber, { foreignKey: 'fiberId' });
  Nap.hasMany(Installation, { foreignKey: 'napId' });

  // Relaciones de ServiceType
  ServiceType.hasMany(Installation, { foreignKey: 'serviceTypeId' });

  // Relaciones de Customer
  Customer.hasMany(Installation, { foreignKey: 'customerId' });

  // Relaciones de Evidence
  Evidence.hasMany(EvidenceImage, { foreignKey: 'evidenceId', as: 'images' });
  Evidence.belongsTo(Installation, { foreignKey: 'installationId', as: 'installation' });
  Evidence.belongsTo(Inspection, { foreignKey: 'inspectionId', as: 'inspection' });
  Evidence.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Relaciones de EvidenceImage
  EvidenceImage.belongsTo(Evidence, { foreignKey: 'evidenceId', as: 'evidence' });

  // Relaciones de Installation
  Installation.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });
  Installation.belongsTo(Area, { foreignKey: 'areaId' });
  Installation.belongsTo(Customer, { foreignKey: 'customerId' });
  Installation.belongsTo(Fiber, { foreignKey: 'fiberId' });
  Installation.belongsTo(Nap, { foreignKey: 'napId' });
  Installation.belongsTo(Tower, { foreignKey: 'towerId' });
  Installation.belongsTo(Sector, { foreignKey: 'sectorId' });
  Installation.belongsTo(Vlan, { foreignKey: 'vlanId', as: 'vlan' });
  Installation.hasMany(Evidence, { foreignKey: 'installationId', as: 'evidences' });
  Installation.hasMany(Inspection, { foreignKey: 'installationId', as: 'inspections' });
  Installation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Relaciones de Inspection
  Inspection.belongsTo(Installation, { foreignKey: 'installationId', as: 'installation' });
  Inspection.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Inspection.hasMany(Evidence, { foreignKey: 'inspectionId', as: 'evidences' });

  // Relaciones de User
  User.hasMany(Installation, { foreignKey: 'userId', as: 'installations' });
  User.hasMany(Inspection, { foreignKey: 'userId', as: 'inspections' });
  User.hasMany(Evidence, { foreignKey: 'userId', as: 'evidences' });
};

module.exports = initModels;