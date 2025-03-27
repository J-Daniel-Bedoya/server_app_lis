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
