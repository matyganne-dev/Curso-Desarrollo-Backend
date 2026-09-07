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
            //console.log("solicitud entrante", req);
            res.status(200).json({ mensaje: "API de Instrumentos Musicales disponible" });
        });

        app.get("/api/instrumentos", (req, res) => {
            const familia = req.query.familia;

            // /api/instrumentos?familia="cuerda"
            // console.log("req.query.familia", familia);
            // console.log("req.query", req.query);

            //Si no existe parametro (eje: api/instrumentos?familia="cuerda"), traemos todo el listado
            if (!familia) {
                return res.status(200).json(instrumentos);
            }

            //Si existe parametro, filtramos
            //console.log("instrumentos:", instrumentos);
            const resultado = instrumentos.filter(
                (instrumento) => instrumento.familia.toLowerCase() === String(familia).toLowerCase()
            );
            //console.log("\nresultado:", resultado);


            //respuesta filtrada
            res.status(200).json(resultado);
        })

        app.listen(PORT, () => {
            console.log(`Servidor disponible en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error.message);
        process.exitCode = 1;
    }
}

main();