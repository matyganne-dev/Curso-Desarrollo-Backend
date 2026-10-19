require("dotenv").config();

const MINIMO_PUERTO = 1;
const MAXIMO_PUERTO = 65535;

const entorno = process.env.NODE_ENV || "development";

const puerto = Number(process.env.PORT || 3000);

const esEntero = Number.isInteger(puerto);
const estaEnRango = puerto >= MINIMO_PUERTO && puerto <= MAXIMO_PUERTO;

if (!esEntero || !estaEnRango) {
  console.error(
    `Error de configuración: PORT="${process.env.PORT}" no es un número entero válido entre ${MINIMO_PUERTO} y ${MAXIMO_PUERTO}.`,
  );
  process.exit(1);
}

const mongodbUri = process.env.MONGODB_URI;

module.exports = {
  puerto,
  entorno,
  mongodbUri,
};
