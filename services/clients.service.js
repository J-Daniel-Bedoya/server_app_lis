const { Client, Sector, Nap, Evidence } = require("../models");

class ClientService {
  async getAllClients() {
    return Client.findAll({
      include: [
        { model: Sector, attributes: ["id", "name"] },
        { model: Nap, attributes: ["id", "number"] },
        // { model: Evidence, attributes: ["id", "description"] },
      ],
    });
  }

  async getClientById(id) {
    const client = await Client.findByPk(id, {
      include: [
        { model: Sector, attributes: ["id", "name"] },
        { model: Nap, attributes: ["id", "number"] },
        // { model: Evidence, attributes: ["id", "description"] },
      ],
    });
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }

  async createClient(clientData) {
    // Validar relaciones
    await this._validateRelations(clientData);

    // Validar configuración de red
    this._validateNetworkConfig(clientData);

    return Client.create(clientData);
  }

  async updateClient(id, clientData) {
    const client = await Client.findByPk(id);
    if (!client) {
      throw new Error("Client not found");
    }

    // Validar relaciones si se están actualizando
    if (clientData.sectorId || clientData.napId) {
      await this._validateRelations(clientData);
    }

    // Validar configuración de red si se está actualizando
    if (this._hasNetworkConfigChanges(clientData)) {
      this._validateNetworkConfig({
        ...client.toJSON(),
        ...clientData,
      });
    }

    await client.update(clientData);
    return client;
  }

  async deleteClient(id) {
    const client = await Client.findByPk(id);
    if (!client) {
      throw new Error("Client not found");
    }

    // Verificar si hay evidencias asociadas
    const evidenceCount = await Evidence.count({ where: { clientId: id } });
    if (evidenceCount > 0) {
      throw new Error("Cannot delete client with associated evidence");
    }

    await client.destroy();
  }

  async _validateRelations(data) {
    if (data.sectorId) {
      const sector = await Sector.findByPk(data.sectorId);
      if (!sector) {
        throw new Error("Sector not found");
      }
    }

    if (data.nap_id) {
      const nap = await Nap.findByPk(data.napId);
      if (!nap) {
        throw new Error("NAP not found");
      }
    }
  }

  _validateNetworkConfig(data) {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

    // Validar IPs
    if (data.antennaIp && !ipv4Regex.test(data.antennaIp)) {
      throw new Error("Invalid antenna IP format");
    }
    if (data.modemIp && !ipv4Regex.test(data.modemIp)) {
      throw new Error("Invalid modem IP format");
    }

    // Validar último octeto par/impar según tipo de instalación
    if (data.installation_type && data.antennaIp) {
      const lastOctet = parseInt(data.antenna_ip.split(".")[3]);
      if (data.installationType === "fiber" && lastOctet % 2 !== 0) {
        throw new Error(
          "Fiber installations must use even last octet for antenna IP"
        );
      } else if (data.installationType === "antenna" && lastOctet % 2 === 0) {
        throw new Error(
          "Antenna installations must use odd last octet for antenna IP"
        );
      }
    }

    // Validar MAC addresses
    if (data.antennaMac && !macRegex.test(data.antennaMac)) {
      throw new Error("Invalid antenna MAC format");
    }
    if (data.modemMac && !macRegex.test(data.modemMac)) {
      throw new Error("Invalid modem MAC format");
    }

    // Validar máscara de subred
    if (data.subnetMask && !ipv4Regex.test(data.subnetMask)) {
      throw new Error("Invalid subnet mask format");
    }

    // Validar gateway
    if (data.gateway && !ipv4Regex.test(data.gateway)) {
      throw new Error("Invalid gateway format");
    }
  }

  _hasNetworkConfigChanges(data) {
    const networkFields = [
      "antenna_ip",
      "modem_ip",
      "antenna_mac",
      "modem_mac",
      "subnet_mask",
      "gateway",
      "dns_primary",
      "dns_secondary",
    ];
    return networkFields.some((field) => data[field] !== undefined);
  }
}

module.exports = new ClientService();
