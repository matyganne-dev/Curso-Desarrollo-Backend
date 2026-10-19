const express = require("express");
const crearControlador = require("../controladores/reservas");
const crearMiddleware = require("../middleware/reservas");

function crearRouter(servicio) {
  const controlador = crearControlador(servicio);
  const middlewareReservas = crearMiddleware(servicio);

  const reservasRouter = express.Router();

  reservasRouter.use(middlewareReservas.prepararAreaReservas);

  reservasRouter.get("/", controlador.listarReservas);
  reservasRouter.post(
    "/",
    middlewareReservas.validarReserva,
    controlador.crearReserva,
  );
  reservasRouter.get("/nueva", controlador.mostrarFormulario);
  reservasRouter.get("/:id", controlador.mostrarDetalle);

  return reservasRouter;
}

module.exports = crearRouter;
