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
            towers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Tower'
              }
            },
            fibers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Fiber'
              }
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
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
            areaId: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Torre Principal'
            },
            location: {
              type: 'string',
              example: '10.123,-71.456'
            },
            sectors: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Sector'
              }
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
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
            towerId: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Sector A'
            },
            azimuth: {
              type: 'string',
              example: '45°'
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
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
            areaId: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Fibra Principal'
            },
            description: {
              type: 'string',
              example: 'Fibra óptica troncal'
            },
            naps: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Nap'
              }
            },
            vlans: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Vlan'
              }
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
            }
          }
        },
        Nap: {
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
              example: 'NAP-001'
            },
            location: {
              type: 'string',
              example: '10.124,-71.457'
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
            }
          }
        },
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
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
            },
            inspections: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Inspection'
              }
            },
            evidences: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Evidence'
              }
            }
          }
        },
        Customer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            dni: {
              type: 'string',
              example: '12345678'
            },
            name: {
              type: 'string',
              example: 'Juan Pérez'
            },
            phone: {
              type: 'string',
              example: '+58 412-1234567'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'juan@example.com'
            },
            address: {
              type: 'string',
              example: 'Calle Principal #123'
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
            }
          }
        },
        DeviceIp: {
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
            ip: {
              type: 'string',
              example: '192.168.1.100'
            },
            type: {
              type: 'string',
              enum: ['onu', 'router', 'other'],
              example: 'router'
            },
            macAddress: {
              type: 'string',
              example: '00:1A:2B:3C:4D:5E'
            },
            description: {
              type: 'string',
              example: 'Router principal del cliente'
            },
            installation: {
              $ref: '#/components/schemas/Installation'
            }
          }
        },
        ServiceType: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Internet Fibra 50MB'
            },
            description: {
              type: 'string',
              example: 'Servicio de internet por fibra óptica de 50MB simétricos'
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
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
            },
            fiber: {
              $ref: '#/components/schemas/Fiber'
            },
            installations: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Installation'
              }
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
            },
            installation: {
              $ref: '#/components/schemas/Installation'
            },
            inspection: {
              $ref: '#/components/schemas/Inspection'
            },
            user: {
              $ref: '#/components/schemas/User'
            },
            images: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/EvidenceImage'
              }
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
            },
            evidence: {
              $ref: '#/components/schemas/Evidence'
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
            },
            serviceType: {
              $ref: '#/components/schemas/ServiceType'
            },
            area: {
              $ref: '#/components/schemas/Area'
            },
            customer: {
              $ref: '#/components/schemas/Customer'
            },
            fiber: {
              $ref: '#/components/schemas/Fiber'
            },
            nap: {
              $ref: '#/components/schemas/Nap'
            },
            tower: {
              $ref: '#/components/schemas/Tower'
            },
            sector: {
              $ref: '#/components/schemas/Sector'
            },
            vlan: {
              $ref: '#/components/schemas/Vlan'
            },
            evidences: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Evidence'
              }
            },
            inspections: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Inspection'
              }
            },
            user: {
              $ref: '#/components/schemas/User'
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
            },
            installation: {
              $ref: '#/components/schemas/Installation'
            },
            user: {
              $ref: '#/components/schemas/User'
            },
            evidences: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Evidence'
              }
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
