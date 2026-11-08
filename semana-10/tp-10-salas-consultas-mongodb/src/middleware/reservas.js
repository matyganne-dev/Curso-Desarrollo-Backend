function crearMiddleware(servicio) {
  function prepararAreaReservas(req, res, next) {
    res.locals.seccion = "Reservas de salas";
    next();
  }

  function validarReserva(req, res, next) {

    // Mejoras a raiz del feedback tp8 
    // Barrera 1 - Evitar TypeError si el cuerpo está ausente o mal formado
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body) || Object.keys(req.body).length === 0) {
      if (req.baseUrl === "/api/reservas") {
        return res.status(400).json({ error: "Completá todos los campos con valores válidos." });
      }
      return res.status(400).render("reservas/nueva", {
        titulo: "Nueva Reserva",
        error: "Completá todos los campos con valores válidos.",
        valores: {}
      });
    }

    const { estudiante, email, sala, fecha, turno, personas } = req.body;

    // Barrera 2 - Verifica los tipos de datos antes de convertirlos (evita que true = 1)
    // Js evalua con typeof estudiante en la palabra "string", quedando la condición como "string" !== "string"
    if (
      typeof estudiante !== "string" ||
      typeof email !== "string" ||
      typeof sala !== "string" ||
      typeof fecha !== "string" ||
      typeof turno !== "string" ||
      (typeof personas !== "number" && typeof personas !== "string")
    ) {
      if (req.baseUrl === "/api/reservas") {
        return res.status(400).json({ error: "Completá todos los campos con valores válidos." });
      }
      return res.status(400).render("reservas/nueva", {
        titulo: "Nueva Reserva",
        error: "Completá todos los campos con valores válidos.",
        valores: req.body
      });
    }

    // valores limpios
    const estudianteLimpio = String(estudiante ?? "").trim();
    const emailLimpio = String(email ?? "").trim();
    const salaLimpio = String(sala ?? "").trim();
    const fechaLimpio = String(fecha ?? "").trim();
    const turnoLimpio = String(turno ?? "").trim();

    const personasNum = Number(personas);
    const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

    // Evita el TypeError si el servicio no exporta la función
    const salasPermitidas = (typeof servicio.obtenerSalasPermitidas === "function")
      ? servicio.obtenerSalasPermitidas()
      : ["Sala Norte", "Sala Sur", "Sala Multimedia"];

    if (
      !estudianteLimpio ||
      !emailLimpio ||
      !emailLimpio.includes("@") ||
      !salaLimpio ||
      !salasPermitidas.includes(salaLimpio) ||
      !fechaLimpio ||
      !turnoLimpio ||
      !turnosPermitidos.includes(turnoLimpio) ||
      !Number.isInteger(personasNum) ||
      personasNum < 1 ||
      personasNum > 6
    ) {

      if (req.baseUrl === "/api/reservas") {
        return res.status(400).json({
          error: "Completá todos los campos con valores válidos."
        });
      }

      return res.status(400).render("reservas/nueva", {
        titulo: "Nueva Reserva",
        error: "Completá todos los campos con valores válidos.",
        valores: req.body,
      });
    }

    req.reservaValidada = {
      estudiante: estudianteLimpio,
      email: emailLimpio,
      sala: salaLimpio,
      fecha: fechaLimpio,
      turno: turnoLimpio,
      personas: personasNum
    };
    next();
  }

  return {
    prepararAreaReservas,
    validarReserva,
  };
}

module.exports = crearMiddleware;