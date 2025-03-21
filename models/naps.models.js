const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Nap = sequelize.define(
  "Nap",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ports: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    failPorts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "fail_ports",
    },
    totalPorts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 16,
      },
      field: "total_ports",
    },
    fiberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fiber_id",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Nap;
