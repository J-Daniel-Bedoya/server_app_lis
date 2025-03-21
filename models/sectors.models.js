const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Sector = sequelize.define(
  "Sector",
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
    towerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "tower_id",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Sector;
