function validarReemplazoReserva(req, res, next) {
  const datos = req.body;
  const permitidos = [
    "estudiante",
    "email",
    "sala",
    "fecha",
    "turno",
    "personas",
    "estado",
  ];

  // Rechazar campos desconocidos o _id
  for (const campo of Object.keys(datos)) {
    if (!permitidos.includes(campo)) {
      return res.status(400).json({
        error: `El campo '${campo}' no se puede modificar o es desconocido.`,
      });
    }
  }

  // Validar el campo nuevo de esta unidad
  if (datos.estado !== "pendiente" && datos.estado !== "confirmada") {
    return res
      .status(400)
      .json({ error: "El estado debe ser 'pendiente' o 'confirmada'." });
  }

  // Unificamos lo que ya validó tu código del TP08 con este campo nuevo
  req.cambiosValidos = req.reservaValidada;
  req.cambiosValidos.estado = datos.estado;
  next();
}

function validarActualizacionReserva(req, res, next) {
  const datos = req.body;

  // Evitar TypeError si mandan vacío o arreglos
  if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
    return res.status(400).json({ error: "Enviá un objeto JSON válido." });
  }

  // PATCH solo admite 'personas' y/o 'estado'
  for (const campo of Object.keys(datos)) {
    if (campo !== "personas" && campo !== "estado") {
      return res.status(400).json({
        error: "Solo se puede cambiar la cantidad de personas o el estado.",
      });
    }
  }

  // Exigir al menos un campo
  if (datos.personas === undefined && datos.estado === undefined) {
    return res
      .status(400)
      .json({ error: "Enviá personas o estado para actualizar." });
  }

  const cambios = {};

  if (datos.personas !== undefined) {
    if (
      typeof datos.personas !== "number" &&
      typeof datos.personas !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Personas debe ser número o texto numérico." });
    }

    const personasNum = Number(datos.personas);
    if (!Number.isInteger(personasNum) || personasNum < 1 || personasNum > 6) {
      return res
        .status(400)
        .json({ error: "Personas debe ser un número entero entre 1 y 6." });
    }
    cambios.personas = personasNum;
  }

  if (datos.estado !== undefined) {
    if (datos.estado !== "pendiente" && datos.estado !== "confirmada") {
      return res
        .status(400)
        .json({ error: "El estado debe ser 'pendiente' o 'confirmada'." });
    }
    cambios.estado = datos.estado;
  }

  req.cambiosValidos = cambios;
  next();
}

module.exports = { validarReemplazoReserva, validarActualizacionReserva };
