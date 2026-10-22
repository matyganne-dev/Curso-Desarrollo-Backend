const express = require("express");

function crearRouterReservasApi(controlador, middleware) {
  const router = express.Router();

  router.get("/", controlador.listarApi);
  router.get("/:id", controlador.obtenerApi);
  router.post("/", middleware.validarReserva, controlador.crearApi);

  return router;
}

module.exports = { crearRouterReservasApi };