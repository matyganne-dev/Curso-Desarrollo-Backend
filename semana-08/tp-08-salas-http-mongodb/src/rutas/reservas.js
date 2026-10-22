const express = require("express");

function crearRouterReservas(controlador, middleware) {
  const router = express.Router();

  router.use(middleware.prepararAreaReservas);

  router.get("/", controlador.listar);
  router.get("/nueva", controlador.mostrarFormulario);
  router.post("/", middleware.validarReserva, controlador.crear);
  router.get("/:id", controlador.mostrarDetalle);

  return router;
}

module.exports = { crearRouterReservas };