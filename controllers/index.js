const {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} = require("./areas.controller");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./users.controller");

const {
  getAllTowers,
  getTowerById,
  createTower,
  updateTower,
  deleteTower,
} = require("./towers.controller");

const {
  getAllNaps,
  getNapById,
  createNap,
  updateNap,
  deleteNap,
} = require("./naps.controller");

const {
  getAllSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector,
} = require("./sectors.controller");

const {
  getAllFibers,
  getFiberById,
  createFiber,
  updateFiber,
  deleteFiber,
} = require("./fiber.controller");


const {
  getAllEvidence,
  getEvidenceById,
  createEvidence,
  updateEvidence,
  deleteEvidence,
  uploadImages,
} = require("./evidence.controller");

const {
  getAllServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType,
} = require("./serviceType.controller");

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./customer.controller");

const {
  getAllDeviceIps,
  getDeviceIpById,
  createDeviceIp,
  updateDeviceIp,
  deleteDeviceIp,
} = require("./deviceIp.controller");


const { login, getProfile } = require("./auth.controller");

module.exports = {
  areaController: {
    getAllAreas,
    getAreaById,
    createArea,
    updateArea,
    deleteArea,
  },
  authController: {
    login,
    getProfile,
  },
  userController: {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  },
  towerController: {
    getAllTowers,
    getTowerById,
    createTower,
    updateTower,
    deleteTower,
  },
  napController: {
    getAllNaps,
    getNapById,
    createNap,
    updateNap,
    deleteNap,
  },
  sectorController: {
    getAllSectors,
    getSectorById,
    createSector,
    updateSector,
    deleteSector,
  },
  fiberController: {
    getAllFibers,
    getFiberById,
    createFiber,
    updateFiber,
    deleteFiber,
  },
  evidenceController: {
    getAllEvidence,
    getEvidenceById,
    createEvidence,
    updateEvidence,
    deleteEvidence,
    uploadImages,
  },
  serviceTypeController: {
    getAllServiceTypes,
    getServiceTypeById,
    createServiceType,
    updateServiceType,
    deleteServiceType,
  },
  customerController: {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  },
  deviceIpController: {
    getAllDeviceIps,
    getDeviceIpById,
    createDeviceIp,
    updateDeviceIp,
    deleteDeviceIp,
  },
};
