require("dotenv").config();
const express = require("express");
const cors = require("cors");
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
  clientRoutes,
  evidenceRoutes,
  authRoutes,
} = require("./routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Health check para Railway
app.get("/health", (req, res) => {
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
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/evidence", evidenceRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Función para iniciar el servidor
async function startServer() {
  try {
    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");

    // Configurar puerto y host
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.DB_HOST;

    // Iniciar servidor
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

// Iniciar servidor
startServer();
