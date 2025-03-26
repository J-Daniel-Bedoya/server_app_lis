const DeviceIp = require('../models/deviceIp.models');
const Installation = require('../models/installations.models');
const { Op } = require('sequelize');

class DeviceIpService {
  async findByInstallationId(installationId) {
    const deviceIp = await DeviceIp.findOne({
      where: { installationId },
      include: [{
        model: Installation,
        attributes: ['id', 'serviceTypeId']
      }]
    });

    if (!deviceIp) {
      throw new Error('IPs de dispositivos no encontradas');
    }

    return deviceIp;
  }

  async create(data) {
    const { installationId, antennaIp, modemIp, onuIp } = data;

    // Verificar que la instalación existe
    const installation = await Installation.findByPk(installationId);
    if (!installation) {
      throw new Error('La instalación no existe');
    }

    // Validar formato de IPs
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (antennaIp && !ipRegex.test(antennaIp)) {
      throw new Error('Formato de IP de antena inválido');
    }
    if (modemIp && !ipRegex.test(modemIp)) {
      throw new Error('Formato de IP de modem inválido');
    }
    if (onuIp && !ipRegex.test(onuIp)) {
      throw new Error('Formato de IP de ONU inválido');
    }

    // Verificar IPs duplicadas
    const existingIps = await DeviceIp.findOne({
      where: {
        [Op.or]: [
          antennaIp ? { antennaIp } : null,
          modemIp ? { modemIp } : null,
          onuIp ? { onuIp } : null
        ].filter(Boolean)
      }
    });

    if (existingIps) {
      throw new Error('Una o más IPs ya están en uso');
    }

    return await DeviceIp.create({
      installationId,
      antennaIp,
      modemIp,
      onuIp
    });
  }

  async update(installationId, data) {
    const deviceIp = await this.findByInstallationId(installationId);
    const { antennaIp, modemIp, onuIp } = data;

    // Validar formato de IPs
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (antennaIp && !ipRegex.test(antennaIp)) {
      throw new Error('Formato de IP de antena inválido');
    }
    if (modemIp && !ipRegex.test(modemIp)) {
      throw new Error('Formato de IP de modem inválido');
    }
    if (onuIp && !ipRegex.test(onuIp)) {
      throw new Error('Formato de IP de ONU inválido');
    }

    // Verificar IPs duplicadas (excluyendo las IPs actuales del dispositivo)
    const existingIps = await DeviceIp.findOne({
      where: {
        [Op.and]: [
          { installationId: { [Op.ne]: installationId } },
          {
            [Op.or]: [
              antennaIp ? { antennaIp } : null,
              modemIp ? { modemIp } : null,
              onuIp ? { onuIp } : null
            ].filter(Boolean)
          }
        ]
      }
    });

    if (existingIps) {
      throw new Error('Una o más IPs ya están en uso');
    }

    await deviceIp.update({
      antennaIp,
      modemIp,
      onuIp
    });

    return deviceIp;
  }
}

module.exports = new DeviceIpService();
