const { db } = require('../utils/db');
const sharp = require('sharp');
const { uploadToStorage } = require('../utils/storage');

class EvidenceService {
  async createEvidence(evidenceData, imageFile) {
    const {
      installationId,
      inspectionId,
      type,
      description,
      uploadedBy,
      metadata
    } = evidenceData;

    // Validar el tipo de evidencia
    if (!this.validateEvidenceType(type)) {
      throw new Error('Tipo de evidencia inválido');
    }

    // Procesar la imagen y crear thumbnail
    const { imageUrl, thumbnailUrl } = await this.processAndUploadImage(imageFile);

    // Crear el registro de evidencia
    const evidence = await db.evidence.create({
      installationId,
      inspectionId,
      type,
      imageUrl,
      thumbnailUrl,
      uploadedBy,
      description,
      metadata: {
        ...metadata,
        originalName: imageFile.originalname,
        timestamp: new Date().toISOString(),
      }
    });

    return this.getEvidenceById(evidence.id);
  }

  async getEvidenceById(id) {
    return db.evidence.findByPk(id, {
      include: [
        {
          model: db.installations,
          as: 'installation',
          attributes: ['id', 'address']
        },
        {
          model: db.inspections,
          as: 'inspection'
        },
        {
          model: db.users,
          as: 'technician',
          attributes: ['id', 'name']
        }
      ]
    });
  }

  async getEvidenceByInstallation(installationId) {
    return db.evidence.findAll({
      where: { installationId },
      include: [
        {
          model: db.users,
          as: 'technician',
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async getEvidenceByInspection(inspectionId) {
    return db.evidence.findAll({
      where: { inspectionId },
      include: [
        {
          model: db.users,
          as: 'technician',
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async deleteEvidence(id) {
    const evidence = await db.evidence.findByPk(id);
    if (!evidence) {
      throw new Error('Evidencia no encontrada');
    }

    // Aquí deberíamos eliminar también las imágenes del storage
    // TODO: Implementar deleteFromStorage(evidence.imageUrl)
    
    await evidence.destroy();
  }

  // Helpers
  validateEvidenceType(type) {
    const validTypes = [
      'antenna_installation',
      'onu_installation',
      'signal_power',
      'modem',
      'device_serial',
      'speed_test',
      'other'
    ];
    return validTypes.includes(type);
  }

  async processAndUploadImage(imageFile) {
    // Procesar imagen original
    const processedImage = await sharp(imageFile.buffer)
      .jpeg({ quality: 80 })
      .toBuffer();

    // Crear thumbnail
    const thumbnail = await sharp(imageFile.buffer)
      .resize(300, 300, { fit: 'inside' })
      .jpeg({ quality: 60 })
      .toBuffer();

    // Subir ambas imágenes al storage
    const imageUrl = await uploadToStorage(processedImage, 'evidence');
    const thumbnailUrl = await uploadToStorage(thumbnail, 'thumbnails');

    return { imageUrl, thumbnailUrl };
  }
}

module.exports = new EvidenceService();
