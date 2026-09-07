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


        app.get("/api/instrumentos/:id", (req, res) => {
            //Extraemos y convertimos a number
            const id = Number(req.params.id);
            //Buscamos con el dinf
            const instrumento = instrumentos.find((elemento) => elemento.id === id);
            //Si no encuentra devolvemos el error
            if (!instrumento) {
                return res.status(404).json({ error: "Instrumento no encontrado" });
            }
            //De caso contrario si lo encontramos y devolvemos el valor encontrado.
            res.status(200).json(instrumento);
        });

        app.post("/api/instrumentos", (req, res) => {
            //Extraemos los datos del cliente
            const { nombre, familia, origen, descripcion, disponible } = req.body;
            //validacion de campos
            if (!nombre || !familia || !origen || !descripcion || disponible === undefined) {
                return res.status(400).json({
                    error: "Los campos nombre, familia, origen, descripcion y disponible son obligatorios."
                });
            }

            //Generación del nuevo ID
            //buscamos el ID del último elemento y le sumamos 1
            const ultimoId = instrumentos.length === 0 ? 0 : instrumentos[instrumentos.length - 1].id;

            const nuevoInstrumento = {
                id: ultimoId + 1,
                nombre,
                familia,
                origen,
                descripcion,
                disponible
            };

            //Agregamos el nuevo instrumento a nuestro array
            instrumentos.push(nuevoInstrumento);
            // devolvemos estado y objeto
            res.status(201).json(nuevoInstrumento);
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