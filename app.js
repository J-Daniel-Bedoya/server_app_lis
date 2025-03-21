require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { sequelize } = require("./utils/db");
const initModels = require("./models/initModels.models");

// Importar rutas desde el archivo index
const {
  userRoutes,
  areaRoutes,
  towerRoutes,
  sectorRoutes,
  fiberRoutes,
  napRoutes,
  evidenceRoutes,
  authRoutes,
  installationRoutes,
  inspectionRoutes,
} = require("./routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API de Registro Técnico LIS",
  customfavIcon: "/assets/favicon.ico"
}));

// Health check para Railway
app.get("/", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Inicializar modelos y sus relaciones
initModels();

// Rutas de autenticación
app.use("/api/v1/auth", authRoutes);

// Rutas protegidas de la API
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/areas", areaRoutes);
app.use("/api/v1/towers", towerRoutes);
app.use("/api/v1/sectors", sectorRoutes);
app.use("/api/v1/fiber", fiberRoutes);
app.use("/api/v1/naps", napRoutes);
app.use("/api/v1/evidence", evidenceRoutes);
app.use("/api/v1/installations", installationRoutes);
app.use("/api/v1/inspections", inspectionRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Inicializar la conexión a la base de datos
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");

    // Configurar puerto y host
    const PORT = process.env.PORT;
    // const HOST = process.env.HOST_NAME;

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      // console.log(`API Documentation available at http://${HOST}:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();
