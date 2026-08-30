const fs = require("node:fs/promises");
const path = require("node:path");

async function leerJson(ruta) {
  const texto = await fs.readFile(ruta, "utf8");
  return JSON.parse(texto);
}

async function escribirTexto(ruta, contenido) {
  const carpeta = path.dirname(ruta);
  await fs.mkdir(carpeta, { recursive: true });
  await fs.writeFile(ruta, contenido, "utf8");
}

module.exports = {
  leerJson,
  escribirTexto,
};