const express = require("express");
const controlador = require("../controladores/reservas");
const middlewareReservas = require("../middleware/reservas");

const reservasRouter = express.Router();

reservasRouter.use(middlewareReservas.prepararAreaReservas);

reservasRouter.get("/", controlador.listarReservas);
reservasRouter.post("/", middlewareReservas.validarReserva, controlador.crearReserva);
reservasRouter.get("/nueva", controlador.mostrarFormulario);
reservasRouter.get("/:id", controlador.mostrarDetalle);

module.exports = reservasRouter;