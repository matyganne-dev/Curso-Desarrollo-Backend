const reservas = [
    { id: 1, estudiante: "Lisa Su", email: "lisa@amd.com", sala: "Sala Norte", fecha: "2026-09-23", turno: "Noche", personas: 2 },
    { id: 2, estudiante: "Jensen Huang", email: "jensen@nvidia.com", sala: "Sala Sur", fecha: "2026-09-24", turno: "Tarde", personas: 4 },
    { id: 3, estudiante: "Pat Gelsinger", email: "pat@intel.com", sala: "Sala Multimedia", fecha: "2026-09-25", turno: "Mañana", personas: 3 },
    { id: 4, estudiante: "Satya Nadella", email: "satya@microsoft.com", sala: "Sala Norte", fecha: "2026-09-26", turno: "Noche", personas: 5 }
];

const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];

const servicioReservas = {
    obtenerTodas: () => reservas,
    obtenerPorId: (id) => reservas.find((elemento) => elemento.id === id),
    obtenerSalasPermitidas: () => salasPermitidas,
    contar: () => reservas.length,
    agregar: (reserva) => {
        const ultimoId = reservas.reduce(
            (mayorId, r) => Math.max(mayorId, r.id),
            0
        );
        const nuevaReserva = { id: ultimoId + 1, ...reserva };
        reservas.push(nuevaReserva);
        return nuevaReserva;
    }
};

module.exports = servicioReservas;