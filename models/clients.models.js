const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
const { User } = require("./users.models");

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cel: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: /^\+?[1-9]\d{1,14}$/, // Validación básica de número telefónico
      },
    },
    serviceType: {
      type: DataTypes.ENUM("antenna", "fiber"),
      allowNull: false,
      field: "service_type",
    },
    antennaIp: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        isValidAntennaIP(value) {
          if (this.serviceType === 'antenna' && !value) {
            throw new Error('Antenna IP is required for antenna service');
          }
          if (value) {
            // Validar formato IP
            if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
              throw new Error('Invalid IP format');
            }
            // Validar que termine en número impar para clientes
            const lastOctet = parseInt(value.split(".")[3]);
            if (lastOctet % 2 === 0) {
              throw new Error("Client IP address must end in an odd number");
            }
          }
        },
      },
      field: "antenna_ip",
    },
    macAddress: {
      type: DataTypes.STRING(17),
      allowNull: false,
      validate: {
        is: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      },
      field: "mac_address",
    },
    modemIp: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        isValidModemIP(value) {
          if (this.serviceType === 'antenna' && !value) {
            throw new Error('Modem IP is required for antenna service');
          }
          if (value && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
            throw new Error('Invalid IP format');
          }
        },
      },
      field: "modem_ip",
    },
    onuIp: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        isValidOnuIP(value) {
          if (this.serviceType === 'fiber' && !value) {
            throw new Error('ONU IP is required for fiber service');
          }
          if (value && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
            throw new Error('Invalid IP format');
          }
        },
      },
      field: "onu_ip",
    },
    installationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    technicianId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "technician_id",
      validate: {
        async isTechnician(value) {
          const technician = await User.findByPk(value);
          if (!technician) {
            throw new Error('Technician not found');
          }
          if (technician.role !== 'technician') {
            throw new Error('Assigned user must have technician role');
          }
        }
      }
    },
    sectorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "sector_id",
    },
    napId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "nap_id",
    },
  },
  {
    timestamps: true,
    validate: {
      validateServiceTypeRequirements() {
        if (this.serviceType === 'fiber') {
          // Para fibra: onuIp requerido, antennaIp y modemIp deben ser null
          if (!this.onuIp) {
            throw new Error('ONU IP is required for fiber service');
          }
          if (this.antennaIp) {
            throw new Error('Antenna IP must be null for fiber service');
          }
          if (this.modemIp) {
            throw new Error('Modem IP must be null for fiber service');
          }
          if (!this.napId) {
            throw new Error('NAP ID is required for fiber service');
          }
        } else if (this.serviceType === 'antenna') {
          // Para antena: antennaIp y modemIp requeridos, onuIp debe ser null
          if (!this.antennaIp) {
            throw new Error('Antenna IP is required for antenna service');
          }
          if (!this.modemIp) {
            throw new Error('Modem IP is required for antenna service');
          }
          if (this.onuIp) {
            throw new Error('ONU IP must be null for antenna service');
          }
          if (!this.sectorId) {
            throw new Error('Sector ID is required for antenna service');
          }
        }
      }
    }
  }
);

module.exports = Client;
