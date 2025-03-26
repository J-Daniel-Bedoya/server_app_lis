require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
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
  serviceTypeRoutes,
  customerRoutes,
  deviceIpRoutes,
  vlanRoutes
} = require("./routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Documentación Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

// Health check para Railway
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      status: "healthy",
      documentation: `http://serverapplis-production.up.railway.app/api-docs`,
    });
});

// Inicializar modelos y sus relaciones
initModels();

// Rutas de autenticación
app.use("/api/v1/auth", authRoutes);

// Rutas de usuarios
app.use("/api/v1/users", userRoutes);

// Rutas de negocio principal
app.use("/api/v1/service-types", serviceTypeRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/device-ips", deviceIpRoutes);

// Rutas de infraestructura
app.use("/api/v1/areas", areaRoutes);
app.use("/api/v1/towers", towerRoutes);
app.use("/api/v1/sectors", sectorRoutes);
app.use("/api/v1/fiber", fiberRoutes);
app.use("/api/v1/naps", napRoutes);
app.use("/api/v1/vlans", vlanRoutes);

// Rutas de gestión de servicios
app.use("/api/v1/installations", installationRoutes);
app.use("/api/v1/inspections", inspectionRoutes);
app.use("/api/v1/evidence", evidenceRoutes);

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
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

    const PORT = process.env.PORT;
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(
        `API Documentation available at http://serverapplis-production.up.railway.app/api-docs`
      );
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();
