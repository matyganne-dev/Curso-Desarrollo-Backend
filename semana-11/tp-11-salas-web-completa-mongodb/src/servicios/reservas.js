const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];

function crearServicio(datosIniciales) {
  const reservas = [...datosIniciales];

  return {
    obtenerTodas: () => reservas,
    obtenerPorId: (id) => reservas.find((elemento) => elemento.id === id),
    obtenerSalasPermitidas: () => salasPermitidas,
    contar: () => reservas.length,
    agregar: (reserva) => {
      const ultimoId = reservas.reduce(
        (mayorId, r) => Math.max(mayorId, r.id),
        0,
      );
      const nuevaReserva = { id: ultimoId + 1, ...reserva };
      reservas.push(nuevaReserva);
      return nuevaReserva;
    },
  };
}

module.exports = crearServicio;
