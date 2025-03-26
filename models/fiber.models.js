const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Fiber = sequelize.define(
  "Fiber",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
    subnetMask: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isIP: true,
      },
      field: "subnet_mask",
    },
    gateway: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "area_id",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Fiber;
