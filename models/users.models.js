const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      field: "user_name",
    },
    fullName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "full_name",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "technician", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    timestamps: true, // Añade created_at y updated_at
  }
);

module.exports = User;
