const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");

const config = require("./configuracion");
const reservasRouter = require("./rutas/reservas");
const servicioReservas = require("./servicios/reservas");
const middlewareSolicitudes = require("./middleware/solicitudes");

const formatoMorgan = config.entorno === "production" ? "combined" : "dev";

const app = express();

// Configuración de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/main");

// Pipeline de middleware
app.use(morgan(formatoMorgan));
app.use(middlewareSolicitudes.identificarSolicitud);
app.use(middlewareSolicitudes.medirDuracion);
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta principale
app.get("/", (req, res) => {
  res.render("inicio", {
    titulo: "Inicio - Sistema de Reservas",
  });
});

app.get("/estado", (req, res) => {
  res.json({
    servicio: "activo",
    reservas: servicioReservas.contar(),
    solicitudId: res.locals.solicitudId,
  });
});

// Montaje del router modular
app.use("/reservas", reservasRouter);

app.use((req, res) => {
  res.status(404).render("no-encontrado", {
    titulo: "Página no encontrada",
    mensaje: "La dirección solicitada no existe.",
  });
});

module.exports = app;
