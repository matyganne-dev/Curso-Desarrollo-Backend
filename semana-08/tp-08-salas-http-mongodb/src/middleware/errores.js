function crearManejadorErrores({ vistaFormulario, tituloFormulario }) {
  return function manejarErrores(error, req, res, next) {
    if (res.headersSent) {
      return next(error);
    }

    const esValidacion = error.name === "ValidationError";
    const esEntrada =
      esValidacion ||
      error.codigo === "ID_INVALIDO" ||
      error.codigo === "FILTRO_INVALIDO" ||
      error.type === "entity.parse.failed";

    const estado = esEntrada ? 400 : 500;
    let mensaje = esEntrada
      ? "Revisa los datos enviados."
      : "No se pudo completar la operacion.";

    if (error.codigo === "ID_INVALIDO") {
      mensaje = "El identificador debe tener 24 caracteres hexadecimales.";
    }

    console.error("Solicitud fallida:", res.locals.solicitudId ?? "Desconocido", error.name);

    if (req.path.startsWith("/api/")) {
      return res.status(estado).json({
        error: mensaje,
        campos: esValidacion ? Object.keys(error.errors) : undefined,
      });
    }

    if (esValidacion && req.method === "POST") {
      return res.status(400).render(vistaFormulario, {
        titulo: tituloFormulario,
        error: mensaje,
        valores: req.body ?? {},
      });
    }

    return res.status(estado).render("no-encontrado", {
      titulo: esEntrada ? "Solicitud invalida" : "Error del servicio",
      mensaje,
    });
  };
}

module.exports = { crearManejadorErrores };