const express = require("express");
const {
  validarReemplazoReserva,
  validarActualizacionReserva,
} = require("../middleware/cambios-reservas");

function crearRouterReservasApi(controlador, middleware) {
  const router = express.Router();

  router.get("/", controlador.listarApi);
  router.get("/:id", controlador.obtenerApi);
  router.post("/", middleware.validarReserva, controlador.crearApi);
  router.put(
    "/:id",
    middleware.validarReserva,
    validarReemplazoReserva,
    controlador.reemplazarApi,
  );
  router.patch("/:id", validarActualizacionReserva, controlador.actualizarApi);
  router.delete("/:id", controlador.eliminarApi);
  return router;
}

module.exports = { crearRouterReservasApi };
