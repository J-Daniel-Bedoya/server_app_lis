const User = require('./users.models');
const Area = require('./areas.models');
const Tower = require('./towers.models');
const Fiber = require('./fiber.models');
const Vlan = require('./vlan.models');
const Sector = require('./sectors.models');
const Nap = require('./naps.models');
const Evidence = require('./evidence.models');
const EvidenceImage = require('./evidence_images.models');
const Installation = require('./installations.models');
const Inspection = require('./inspections.models');

const models = {
  User,
  Area,
  Tower,
  Fiber,
  Vlan,
  Sector,
  Nap,
  Evidence,
  EvidenceImage,
  Installation,
  Inspection
};

module.exports = models;