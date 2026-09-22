const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");

const app = express();
const PORT = 3000;

//DATOS
const reservas = [
    {
        id: 1,
        estudiante: "Lisa Su",
        email: "lisa@amd.com",
        sala: "Sala Norte",
        fecha: "2026-09-23",
        turno: "Noche",
        personas: 2
    },
    {
        id: 2,
        estudiante: "Jensen Huang",
        email: "jensen@nvidia.com",
        sala: "Sala Sur",
        fecha: "2026-09-24",
        turno: "Tarde",
        personas: 4
    },
    {
        id: 3,
        estudiante: "Pat Gelsinger",
        email: "pat@intel.com",
        sala: "Sala Multimedia",
        fecha: "2026-09-25",
        turno: "Mañana",
        personas: 3
    },
    {
        id: 4,
        estudiante: "Satya Nadella",
        email: "satya@microsoft.com",
        sala: "Sala Norte",
        fecha: "2026-09-26",
        turno: "Noche",
        personas: 5
    }
];

const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];

// Middlewares
let numeroDeSolicitud = 0;

function identificarSolicitud(req, res, next) {
    numeroDeSolicitud += 1;
    res.locals.solicitudId = `BIB-${String(numeroDeSolicitud).padStart(4, "0")}`;
    next();
}

function medirDuracion(req, res, next) {
    const inicio = process.hrtime.bigint();
    res.on("finish", () => {
        const fin = process.hrtime.bigint();
        const milisegundos = Number(fin - inicio) / 1_000_000;
        console.log(
            `[${res.locals.solicitudId}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${milisegundos.toFixed(2)} ms`
        );
    });
    next();
}

//Config vistas

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/main");

// pipeline middleware
app.use(morgan("dev"));
app.use(identificarSolicitud);
app.use(medirDuracion);
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Aplicación disponible en http://localhost:${PORT}`);
});