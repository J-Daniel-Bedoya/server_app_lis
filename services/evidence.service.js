const { Evidence, EvidenceImage, Client } = require('../models');

class EvidenceService {
  async getAllEvidence() {
    return Evidence.findAll({
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: EvidenceImage, attributes: ['id', 'image_url'] }
      ]
    });
  }

  async getEvidenceById(id) {
    const evidence = await Evidence.findByPk(id, {
      include: [
        { model: Client, attributes: ['id', 'name'] },
        { model: EvidenceImage, attributes: ['id', 'image_url'] }
      ]
    });
    if (!evidence) {
      throw new Error('Evidence not found');
    }
    return evidence;
  }

  async createEvidence(evidenceData) {
    // Verificar que el cliente existe
    const client = await Client.findByPk(evidenceData.client_id);
    if (!client) {
      throw new Error('Client not found');
    }

    // Crear la evidencia
    const evidence = await Evidence.create(evidenceData);

    // Si hay imágenes, crearlas
    if (evidenceData.images && Array.isArray(evidenceData.images)) {
      const imagePromises = evidenceData.images.map(imageUrl => 
        EvidenceImage.create({
          evidence_id: evidence.id,
          image_url: imageUrl
        })
      );
      await Promise.all(imagePromises);
    }

    // Retornar la evidencia con sus imágenes
    return this.getEvidenceById(evidence.id);
  }

  async updateEvidence(id, evidenceData) {
    const evidence = await Evidence.findByPk(id);
    if (!evidence) {
      throw new Error('Evidence not found');
    }

    // Si se está actualizando el cliente, verificar que existe
    if (evidenceData.client_id) {
      const client = await Client.findByPk(evidenceData.client_id);
      if (!client) {
        throw new Error('Client not found');
      }
    }

    // Actualizar la evidencia
    await evidence.update(evidenceData);

    // Si hay imágenes nuevas, agregarlas
    if (evidenceData.images && Array.isArray(evidenceData.images)) {
      const imagePromises = evidenceData.images.map(imageUrl => 
        EvidenceImage.create({
          evidence_id: evidence.id,
          image_url: imageUrl
        })
      );
      await Promise.all(imagePromises);
    }

    // Retornar la evidencia actualizada con sus imágenes
    return this.getEvidenceById(id);
  }

  async deleteEvidence(id) {
    const evidence = await Evidence.findByPk(id);
    if (!evidence) {
      throw new Error('Evidence not found');
    }

    // Eliminar las imágenes asociadas
    await EvidenceImage.destroy({
      where: { evidence_id: id }
    });

    // Eliminar la evidencia
    await evidence.destroy();
  }

  async addImageToEvidence(evidenceId, imageUrl) {
    const evidence = await Evidence.findByPk(evidenceId);
    if (!evidence) {
      throw new Error('Evidence not found');
    }

    const image = await EvidenceImage.create({
      evidence_id: evidenceId,
      image_url: imageUrl
    });

    return image;
  }

  async removeImageFromEvidence(evidenceId, imageId) {
    const image = await EvidenceImage.findOne({
      where: {
        id: imageId,
        evidence_id: evidenceId
      }
    });

    if (!image) {
      throw new Error('Image not found');
    }

    await image.destroy();
  }
}

module.exports = new EvidenceService();
