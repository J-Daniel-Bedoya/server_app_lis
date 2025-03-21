/**
 * Maneja errores HTTP y envía respuestas consistentes
 * @param {Response} res - Objeto de respuesta Express
 * @param {Error} error - Error a manejar
 */
function handleHttpError(res, error) {
  console.error('Error:', error);

  // Errores de validación de Sequelize
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: true,
      message: 'Error de validación',
      details: error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
    });
  }

  // Errores únicos de Sequelize (e.g., duplicados)
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: true,
      message: 'Error de registro duplicado',
      details: error.errors.map(err => ({
        field: err.path,
        message: 'Ya existe un registro con este valor'
      }))
    });
  }

  // Errores de clave foránea
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: true,
      message: 'Error de referencia',
      details: [{
        field: error.fields[0],
        message: 'La referencia no existe'
      }]
    });
  }

  // Error personalizado con código de estado
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      error: true,
      message: error.message
    });
  }

  // Errores de autenticación
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: true,
      message: 'No autorizado'
    });
  }

  // Error por defecto
  return res.status(500).json({
    error: true,
    message: 'Error interno del servidor'
  });
}

/**
 * Crea un error con código de estado HTTP
 * @param {string} message - Mensaje de error
 * @param {number} statusCode - Código de estado HTTP
 */
function createHttpError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = {
  handleHttpError,
  createHttpError
};
