const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Evidence = sequelize.define(
  "Evidence",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "client_id",
    },
    installationType: {
      type: DataTypes.ENUM("antenna", "fiber"),
      allowNull: false,
      field: "installation_type",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Evidence;
