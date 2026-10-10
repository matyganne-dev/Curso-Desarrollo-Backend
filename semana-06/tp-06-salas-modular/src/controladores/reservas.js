const servicioReservas = require("../servicios/reservas");

function listarReservas(req, res) {
    res.render("reservas/lista", {
        titulo: "Listado de Reservas",
        reservas: servicioReservas.obtenerTodas()
    });
}

function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
        titulo: "Nueva Reserva",
        error: null,
        valores: {}
    });
}

function mostrarDetalle(req, res) {
    const id = Number(req.params.id);
    const reserva = servicioReservas.obtenerPorId(id);

    if (!reserva) {
        return res.status(404).render("no-encontrado", {
            titulo: "Reserva no encontrada",
            mensaje: "No existe una reserva con ese identificador."
        });
    }

    res.render("reservas/detalle", {
        titulo: `Detalle de la Reserva #${reserva.id}`,
        reserva: reserva
    });
}

function crearReserva(req, res) {
    servicioReservas.agregar(req.reservaValidada);
    res.redirect("/reservas");
}

module.exports = {
    listarReservas,
    mostrarFormulario,
    mostrarDetalle,
    crearReserva
};