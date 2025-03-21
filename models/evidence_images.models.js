const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const EvidenceImage = sequelize.define(
  "EvidenceImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    evidenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "evidence_id",
    },
    imageType: {
      type: DataTypes.ENUM(
        "antenna_installation",
        "cable_installation",
        "router_configuration",
        "signal_test",
        "speed_test",
        "client_signature",
        "other"
      ),
      allowNull: false,
      field: "image_type",
    },
    imagePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "image_path",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = EvidenceImage;
