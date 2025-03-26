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
        url: 'https://serverapplis-production.up.railway.app',
        description: 'Servidor de producción'
      },
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
              enum: ['admin', 'technician', 'secretary'],
              example: 'technician'
            }
          }
        },
        Vlan: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            fiberId: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'VLAN_101'
            },
            ip: {
              type: 'string',
              example: '192.168.1.0'
            },
            mask: {
              type: 'string',
              example: '255.255.255.0'
            },
            gateway: {
              type: 'string',
              example: '192.168.1.1'
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
            installationId: {
              type: 'integer',
              example: 1
            },
            inspectionId: {
              type: 'integer',
              example: 1
            },
            type: {
              type: 'string',
              enum: [
                'antenna_installation',
                'onu_installation',
                'signal_power',
                'modem',
                'device_serial',
                'speed_test',
                'other'
              ],
              example: 'antenna_installation'
            },
            imageUrl: {
              type: 'string',
              example: 'https://storage.example.com/evidence/123.jpg'
            },
            thumbnailUrl: {
              type: 'string',
              example: 'https://storage.example.com/evidence/123_thumb.jpg'
            },
            metadata: {
              type: 'object',
              example: {
                location: '10.123,-71.456',
                deviceInfo: 'iPhone 12'
              }
            },
            userId: {
              type: 'integer',
              example: 1
            }
          }
        },
        EvidenceImage: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            evidenceId: {
              type: 'integer',
              example: 1
            },
            imageType: {
              type: 'string',
              enum: [
                'antenna_installation',
                'fiber_installation',
                'nap_connection',
                'router_configuration',
                'signal_test',
                'speed_test',
                'client_signature',
                'inspection_evidence',
                'other'
              ],
              example: 'antenna_installation'
            },
            imageUrl: {
              type: 'string',
              example: 'https://storage.example.com/evidence/123_1.jpg'
            },
            thumbnailUrl: {
              type: 'string',
              example: 'https://storage.example.com/evidence/123_1_thumb.jpg'
            },
            userId: {
              type: 'integer',
              example: 1
            }
          }
        },
        Installation: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            customerId: {
              type: 'integer',
              example: 1
            },
            areaId: {
              type: 'integer',
              example: 1
            },
            towerId: {
              type: 'integer',
              example: 1
            },
            sectorId: {
              type: 'integer',
              example: 1
            },
            fiberId: {
              type: 'integer',
              example: 1
            },
            napId: {
              type: 'integer',
              example: 1
            },
            vlanId: {
              type: 'integer',
              example: 1
            },
            serviceTypeId: {
              type: 'integer',
              example: 1
            },
            userId: {
              type: 'integer',
              example: 1
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed', 'cancelled'],
              example: 'completed'
            }
          }
        },
        Inspection: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            installationId: {
              type: 'integer',
              example: 1
            },
            userId: {
              type: 'integer',
              example: 1
            },
            date: {
              type: 'string',
              format: 'date-time',
              example: '2025-03-25T14:00:00Z'
            },
            status: {
              type: 'string',
              enum: ['pending', 'approved', 'rejected'],
              example: 'approved'
            },
            comments: {
              type: 'string',
              example: 'Instalación verificada y funcionando correctamente'
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
              type: 'object',
              example: {
                code: 'VALIDATION_ERROR',
                details: ['Field X is required']
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
