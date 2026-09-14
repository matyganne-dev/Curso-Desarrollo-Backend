const express = require("express");
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");
const leerJson = require("./archivos.js");


const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {
    // console.log("dirname", __dirname);
    // console.log("ruta:", rutaDatos);
    try {
        const mascotas = await leerJson(rutaDatos);

        const app = express();

        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "..", "views"));

        app.use(expressLayouts);
        app.set("layout", "layouts/main");

        app.use(express.static(path.join(__dirname, "..", "public")));
        app.use(express.urlencoded({ extended: false }));

        // app.get("/", (req, res) => {
        //     res.send("Servidor configurado");
        // });

        app.get("/", (req, res) => {
            res.render("inicio", {
                titulo: "Refugio de Mascotas"
            });
        });

        app.get("/mascotas", (req, res) => {
            res.render("mascotas/lista", {
                titulo: "Mascotas en adopción",
                mascotas: mascotas
            });
        });

        app.get("/mascotas/nueva", (req, res) => {
            res.render("mascotas/nueva", {
                titulo: "Dar en adopción",
                error: null,
                valores: {}
            });
        });

        app.get("/mascotas/:id", (req, res) => {
            const id = Number(req.params.id);

            const mascota = mascotas.find((elemento) => elemento.id === id);

            if (!mascota) {
                return res.status(404).render("no-encontrado", {
                    titulo: "Mascota no encontrada"
                });
            }

            res.render("mascotas/detalle", {
                titulo: `Detalle de ${mascota.nombre}`,
                mascota: mascota
            });
        });

        app.post("/mascotas", (req, res) => {
            const { nombre, especie, edad, estado, descripcion } = req.body;
            const nombreLimpio = String(nombre ?? "").trim();
            const especieLimpia = String(especie ?? "").trim();
            const estadoLimpio = String(estado ?? "").trim();
            const descripcionLimpia = String(descripcion ?? "").trim();
            const edadNumerica = Number(edad);

            if (
                !nombreLimpio ||
                !especieLimpia ||
                !estadoLimpio ||
                !descripcionLimpia ||
                !Number.isFinite(edadNumerica) ||
                edadNumerica < 0
            ) {
                return res.status(400).render("mascotas/nueva", {
                    titulo: "Dar en adopción",
                    error: "Por favor, completá todos los campos correctamente. La edad no puede ser negativa.",
                    valores: req.body
                });
            }

            const ultimoId = mascotas.reduce(
                (mayorId, mascota) => Math.max(mayorId, mascota.id),
                0
            );

            const nuevaMascota = {
                id: ultimoId + 1,
                nombre: nombreLimpio,
                especie: especieLimpia,
                edad: edadNumerica,
                estado: estadoLimpio,
                descripcion: descripcionLimpia,
                imagen: "/img/mascota.svg"
            };

            // se agrega el arreglo (solo en memoria, no en el JSON)
            mascotas.push(nuevaMascota);

            // Redireccion
            res.redirect("/mascotas");
        });

        app.listen(PORT, () => {
            console.log(`Servidor de Mascotas disponible en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error.message);
        process.exitCode = 1;
    }
}

main();