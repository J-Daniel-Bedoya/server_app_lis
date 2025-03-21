const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Registro Técnico LIS',
      version: '1.0.0',
      description: 'API para el sistema de registro técnico de LIS',
      contact: {
        name: 'Soporte LIS',
        email: 'soporte@lis.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            userName: {
              type: 'string',
              example: 'john_doe'
            },
            fullName: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            role: {
              type: 'string',
              enum: ['admin', 'technician', 'user'],
              example: 'technician'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Area: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Zona Norte'
            },
            description: {
              type: 'string',
              example: 'Área que cubre el sector norte de la ciudad'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Tower: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Torre Principal'
            },
            description: {
              type: 'string',
              example: 'Torre principal de distribución'
            },
            latitude: {
              type: 'number',
              format: 'float',
              example: 19.4326
            },
            longitude: {
              type: 'number',
              format: 'float',
              example: -99.1332
            },
            height: {
              type: 'number',
              format: 'float',
              example: 30.5
            },
            areaId: {
              type: 'integer',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Sector: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Sector Norte'
            },
            description: {
              type: 'string',
              example: 'Sector que cubre la zona norte de la torre'
            },
            azimuth: {
              type: 'number',
              format: 'float',
              example: 45.5
            },
            beamwidth: {
              type: 'number',
              format: 'float',
              example: 120
            },
            frequency: {
              type: 'string',
              example: '5.8 GHz'
            },
            polarization: {
              type: 'string',
              enum: ['vertical', 'horizontal'],
              example: 'vertical'
            },
            gain: {
              type: 'number',
              format: 'float',
              example: 16
            },
            towerId: {
              type: 'integer',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Fiber: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Fibra Principal'
            },
            description: {
              type: 'string',
              example: 'Fibra principal para distribución'
            },
            type: {
              type: 'string',
              enum: ['aerial', 'underground'],
              example: 'aerial'
            },
            capacity: {
              type: 'integer',
              example: 24
            },
            length: {
              type: 'number',
              format: 'float',
              example: 1500.5
            },
            areaId: {
              type: 'integer',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        NAP: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'NAP-001'
            },
            description: {
              type: 'string',
              example: 'NAP ubicado en poste principal'
            },
            location: {
              type: 'string',
              example: 'Poste 123, Calle Principal'
            },
            coordinates: {
              type: 'string',
              example: '19.4326,-99.1332'
            },
            fiberId: {
              type: 'integer',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Client: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Juan Pérez'
            },
            address: {
              type: 'string',
              example: 'Calle Principal #123'
            },
            phone: {
              type: 'string',
              example: '555-0123'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'juan@example.com'
            },
            serviceType: {
              type: 'string',
              enum: ['antenna', 'fiber'],
              example: 'antenna'
            },
            coordinates: {
              type: 'string',
              example: '19.4326,-99.1332'
            },
            antennaHeight: {
              type: 'number',
              format: 'float',
              example: 10.5
            },
            sectorId: {
              type: 'integer',
              example: 1
            },
            technicianId: {
              type: 'integer',
              example: 2
            },
            onuIp: {
              type: 'string',
              example: '192.168.1.100'
            },
            onuMac: {
              type: 'string',
              example: '00:11:22:33:44:55'
            },
            napId: {
              type: 'integer',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Evidence: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            description: {
              type: 'string',
              example: 'Instalación completada exitosamente'
            },
            type: {
              type: 'string',
              enum: ['installation', 'maintenance', 'repair'],
              example: 'installation'
            },
            clientId: {
              type: 'integer',
              example: 1
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
                example: 'https://storage.example.com/evidence/image1.jpg'
              }
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message'
            },
            error: {
              type: 'string',
              example: 'Error details'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
