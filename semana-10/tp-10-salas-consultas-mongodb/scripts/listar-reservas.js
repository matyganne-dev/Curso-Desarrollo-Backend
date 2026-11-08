const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");
const Reserva = require("../src/modelos/reserva");

async function main() {
  try {
    await conectarBaseDatos();

    const reservas = await Reserva.find();

    console.table(
      reservas.map((r) => ({
        id: r._id.toString(),
        estudiante: r.estudiante,
        sala: r.sala,
        fecha: r.fecha,
        turno: r.turno,
        personas: r.personas,
      })),
    );

    console.log(`Cantidad de reservas recuperadas: ${reservas.length}`);
  } finally {
    await desconectarBaseDatos();
  }
}

main().catch((error) => {
  console.error("Error al listar las reservas:", error.name);
  console.error("Detalle:", error.message);
  process.exitCode = 1;
});
