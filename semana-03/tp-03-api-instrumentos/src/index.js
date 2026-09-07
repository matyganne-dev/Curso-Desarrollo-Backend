const express = require("express");
const path = require("node:path");
const leerJson = require("./archivos.js");

const PORT = 3000;

const rutaDatos = path.join(__dirname, "..", "datos", "instrumentos.json");

async function main() {
  try {
    const instrumentos = await leerJson(rutaDatos);

    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
      res.status(200).json({ mensaje: "API de Instrumentos Musicales disponible" });
    });

    app.listen(PORT, () => {
      console.log(`Servidor disponible en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exitCode = 1;
  }
}

main();