const servicioReservas = require("../servicios/reservas");

function prepararAreaReservas(req, res, next) {
    res.locals.seccion = "Reservas de salas";
    next();
}

function validarReserva(req, res, next) {
    const estudiante = String(req.body.estudiante ?? "").trim();
    const email = String(req.body.email ?? "").trim();
    const sala = String(req.body.sala ?? "").trim();
    const fecha = String(req.body.fecha ?? "").trim();
    const turno = String(req.body.turno ?? "").trim();
    
    const personas = Number(req.body.personas);
    const turnosPermitidos = ["Mañana", "Tarde", "Noche"];
    const salasPermitidas = servicioReservas.obtenerSalasPermitidas();

    if (
        !estudiante || 
        !email || !email.includes("@") || 
        !sala || !salasPermitidas.includes(sala) || 
        !fecha || 
        !turno || !turnosPermitidos.includes(turno) || 
        !Number.isInteger(personas) || personas < 1 || personas > 6 
    ) {
        return res.status(400).render("reservas/nueva", {
            titulo: "Nueva Reserva",
            error: "Completá todos los campos con valores válidos.",
            valores: req.body
        });
    }

    req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
    next();
}

module.exports = {
    prepararAreaReservas,
    validarReserva
};