const Area = require('./area.models');
const Tower = require('./towers.models');
const Sector = require('./sectors.models');
const Fiber = require('./fiber.models');
const Nap = require('./naps.models');
const Client = require('./clients.models');
const Evidence = require('./evidence.models');
const EvidenceImage = require('./evidence_images.models');
const User = require('./users.models');

const initModels = () => {
  // Relaciones de Area
  Area.hasMany(Tower, { foreignKey: 'area_id' });
  Area.hasMany(Fiber, { foreignKey: 'area_id' });
  
  // Relaciones de Torre
  Tower.belongsTo(Area, { foreignKey: 'area_id' });
  Tower.hasMany(Sector, { foreignKey: 'tower_id' });
  
  // Relaciones de Sector
  Sector.belongsTo(Tower, { foreignKey: 'tower_id' });
  Sector.hasMany(Client, { foreignKey: 'sector_id' });
  
  // Relaciones de Fibra
  Fiber.belongsTo(Area, { foreignKey: 'area_id' });
  Fiber.hasMany(Nap, { foreignKey: 'fiber_id' });
  
  // Relaciones de NAP
  Nap.belongsTo(Fiber, { foreignKey: 'fiber_id' });
  Nap.hasMany(Client, { foreignKey: 'nap_id' });
  
  // Relaciones de Cliente
  Client.belongsTo(Sector, { foreignKey: 'sector_id' });
  Client.belongsTo(Nap, { foreignKey: 'nap_id' });
  Client.hasMany(Evidence, { foreignKey: 'client_id' });
  Client.belongsTo(User, {
    as: 'technician',
    foreignKey: 'technician_id',
    scope: {
      role: 'technician'
    }
  });
  
  // Relaciones de Usuario
  User.hasMany(Client, {
    as: 'assignedClients',
    foreignKey: 'technician_id'
  });
  
  // Relaciones de Evidencia
  Evidence.belongsTo(Client, { foreignKey: 'client_id' });
  Evidence.hasMany(EvidenceImage, { foreignKey: 'evidence_id' });
  
  // Relaciones de Imágenes de Evidencia
  EvidenceImage.belongsTo(Evidence, { foreignKey: 'evidence_id' });
};

module.exports = initModels;