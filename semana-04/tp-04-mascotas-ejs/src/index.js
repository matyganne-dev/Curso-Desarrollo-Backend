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

        app.listen(PORT, () => {
            console.log(`Servidor de Mascotas disponible en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error.message);
        process.exitCode = 1;
    }
}

main();