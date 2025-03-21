const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Evidence = sequelize.define(
  "evidence",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    installationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'installation_id',
      references: {
        model: 'installations',
        key: 'id'
      }
    },
    inspectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'inspection_id',
      references: {
        model: 'inspections',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM('installation', 'inspection'),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image_url'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'uploaded_by',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    timestamps: true,
    underscored: true,
    validate: {
      eitherInstallationOrInspection() {
        if (!this.installationId && !this.inspectionId) {
          throw new Error('Evidence must be associated with either an installation or inspection');
        }
        if (this.installationId && this.inspectionId) {
          throw new Error('Evidence cannot be associated with both installation and inspection');
        }
      }
    }
  }
);

module.exports = Evidence;
