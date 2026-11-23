function crearControladorReservas(servicio) {
  async function listar(req, res) {
    const reservas = await servicio.listar();
    res.render("reservas/lista", {
      titulo: "Reservas de salas",
      reservas,
    });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: null,
      valores: {},
    });
  }

  async function mostrarDetalle(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "No existe una reserva con ese identificador.",
      });
    }
    res.render("reservas/detalle", { titulo: "Detalle de reserva", reserva });
  }

  async function crear(req, res) {
    await servicio.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  async function mostrarEdicion(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "No existe la reserva que querés editar.",
      });
    }
    res.render("reservas/editar", {
      titulo: "Editar reserva",
      error: null,
      id: reserva.id,
      valores: { ...reserva },
    });
  }

  async function guardarEdicion(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "La reserva ya no existe. No se guardaron cambios.",
      });
    }

    const datos = req.body ?? {};
    const valores = {
      estudiante: typeof datos.estudiante === "string" ? datos.estudiante : "",
      email: typeof datos.email === "string" ? datos.email : "",
      sala: typeof datos.sala === "string" ? datos.sala : "",
      fecha: typeof datos.fecha === "string" ? datos.fecha : "",
      turno: typeof datos.turno === "string" ? datos.turno : "",
      personas: typeof datos.personas === "string" ? datos.personas : "",
      estado: typeof datos.estado === "string" ? datos.estado : "",
    };

    const permitidos = [
      "estudiante",
      "email",
      "sala",
      "fecha",
      "turno",
      "personas",
      "estado",
    ];

    let hayCamposExtra = false;
    for (const campo of Object.keys(datos)) {
      if (!permitidos.includes(campo)) {
        hayCamposExtra = true;
      }
    }

    const personasNum =
      valores.personas.trim() === "" ? NaN : Number(valores.personas);

    const salasValidas = servicio.obtenerSalasPermitidas();
    const turnosValidos = ["Mañana", "Tarde", "Noche"];
    const estadosValidos = ["pendiente", "confirmada"];

    if (
      hayCamposExtra ||
      !valores.estudiante.trim() ||
      !valores.email.trim() ||
      !salasValidas.includes(valores.sala) ||
      !valores.fecha.trim() ||
      !turnosValidos.includes(valores.turno) ||
      !Number.isInteger(personasNum) ||
      personasNum < 1 ||
      personasNum > 6 ||
      !estadosValidos.includes(valores.estado)
    ) {
      res.locals.formularioEdicion = { id: reserva.id, valores };
      return res.status(400).render("reservas/editar", {
        titulo: "Editar reserva",
        error:
          "Revisá los campos obligatorios, las opciones válidas y que las personas sean de 1 a 6.",
        id: reserva.id,
        valores,
      });
    }

    const reemplazo = {
      estudiante: valores.estudiante.trim(),
      email: valores.email.trim(),
      sala: valores.sala,
      fecha: valores.fecha.trim(),
      turno: valores.turno,
      personas: personasNum,
      estado: valores.estado,
    };

    const actualizado = await servicio.reemplazar(reserva.id, reemplazo);
    if (!actualizado) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "La reserva ya no existe. No se guardaron cambios.",
      });
    }

    res.redirect(303, `/reservas/${actualizado.id}`);
  }

  async function listarApi(req, res) {
    const permitidos = ["sala", "orden", "pagina", "limite"];
    for (const campo of Object.keys(req.query)) {
      if (!permitidos.includes(campo)) {
        return res.status(400).json({ error: "Parámetro no permitido." });
      }
    }

    const sala = req.query.sala;
    if (sala !== undefined) {
      if (typeof sala !== "string" || sala.trim() === "") {
        return res
          .status(400)
          .json({ error: "El texto de sala debe tener contenido." });
      }
    }

    let orden = "estudiante";
    if (req.query.orden !== undefined) {
      orden = req.query.orden;
      if (
        orden !== "estudiante" &&
        orden !== "personas-asc" &&
        orden !== "personas-desc"
      ) {
        return res.status(400).json({ error: "Orden no permitido." });
      }
    }

    let pagina = 1;
    if (req.query.pagina !== undefined) {
      if (typeof req.query.pagina !== "string") {
        return res.status(400).json({ error: "Página no permitida." });
      }
      pagina = Number(req.query.pagina);
      if (!Number.isInteger(pagina) || pagina < 1 || pagina > 1000) {
        return res.status(400).json({ error: "Página no permitida." });
      }
    }

    let limite = 2;
    if (req.query.limite !== undefined) {
      if (typeof req.query.limite !== "string") {
        return res.status(400).json({ error: "Límite no permitido." });
      }
      limite = Number(req.query.limite);
      if (!Number.isInteger(limite) || limite < 1 || limite > 20) {
        return res.status(400).json({ error: "Límite no permitido." });
      }
    }

    const resultado = await servicio.consultar(sala, orden, pagina, limite);
    res.json(resultado);
  }

  async function obtenerApi(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada." });
    }
    res.json(reserva);
  }

  async function crearApi(req, res) {
    const reserva = await servicio.crear(req.reservaValidada);
    res.location(`/api/reservas/${reserva.id}`).status(201).json(reserva);
  }

  async function reemplazarApi(req, res) {
    const reserva = await servicio.reemplazar(
      req.params.id,
      req.cambiosValidos,
    );
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada." });
    }
    res.json(reserva);
  }

  async function actualizarApi(req, res) {
    const reserva = await servicio.actualizar(
      req.params.id,
      req.cambiosValidos,
    );
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada." });
    }
    res.json(reserva);
  }

  async function eliminarApi(req, res) {
    const eliminada = await servicio.eliminar(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ error: "Reserva no encontrada." });
    }
    res.status(204).end();
  }

  return {
    listar,
    mostrarFormulario,
    mostrarDetalle,
    crear,
    mostrarEdicion,
    guardarEdicion,
    listarApi,
    obtenerApi,
    crearApi,
    reemplazarApi,
    actualizarApi,
    eliminarApi,
  };
}

module.exports = { crearControladorReservas };
