const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const EvidenceImage = sequelize.define(
  "evidence_images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    evidenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "evidence_id",
      references: {
        model: 'evidence',
        key: 'id'
      }
    },
    imageType: {
      type: DataTypes.ENUM(
        "antenna_installation",
        "fiber_installation",
        "nap_connection",
        "router_configuration",
        "signal_test",
        "speed_test",
        "client_signature",
        "inspection_evidence",
        "other"
      ),
      allowNull: false,
      field: "image_type"
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "image_url"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "uploaded_by",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    timestamps: true,
    underscored: true
  }
);

module.exports = EvidenceImage;
