const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuración de almacenamiento
const UPLOAD_DIR = path.join(__dirname, '../uploads');
const EVIDENCE_DIR = path.join(UPLOAD_DIR, 'evidence');
const THUMBNAIL_DIR = path.join(UPLOAD_DIR, 'thumbnails');

// Asegurar que los directorios existan
async function ensureDirectories() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.mkdir(EVIDENCE_DIR, { recursive: true });
  await fs.mkdir(THUMBNAIL_DIR, { recursive: true });
}

/**
 * Guarda una imagen y crea su thumbnail
 * @param {Buffer} imageBuffer - Buffer de la imagen
 * @param {string} filename - Nombre del archivo
 * @returns {Promise<{imageUrl: string, thumbnailUrl: string}>}
 */
async function uploadToStorage(imageBuffer, filename) {
  await ensureDirectories();

  // Generar nombres únicos para la imagen y el thumbnail
  const timestamp = Date.now();
  const imageFilename = `${timestamp}-${filename}`;
  const thumbnailFilename = `thumb-${timestamp}-${filename}`;

  // Rutas completas
  const imagePath = path.join(EVIDENCE_DIR, imageFilename);
  const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailFilename);

  // Procesar y guardar la imagen original
  await sharp(imageBuffer)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(imagePath);

  // Crear y guardar el thumbnail
  await sharp(imageBuffer)
    .resize(300, 300, { fit: 'cover' })
    .jpeg({ quality: 60 })
    .toFile(thumbnailPath);

  // Retornar las URLs relativas
  return {
    imageUrl: `/uploads/evidence/${imageFilename}`,
    thumbnailUrl: `/uploads/thumbnails/${thumbnailFilename}`
  };
}

/**
 * Elimina una imagen y su thumbnail
 * @param {string} imageUrl - URL de la imagen
 * @returns {Promise<void>}
 */
async function deleteFromStorage(imageUrl) {
  if (!imageUrl) return;

  const filename = path.basename(imageUrl);
  const thumbnailFilename = `thumb-${filename}`;

  try {
    await fs.unlink(path.join(EVIDENCE_DIR, filename));
    await fs.unlink(path.join(THUMBNAIL_DIR, thumbnailFilename));
  } catch (error) {
    console.error('Error al eliminar archivos:', error);
  }
}

module.exports = {
  uploadToStorage,
  deleteFromStorage
};
