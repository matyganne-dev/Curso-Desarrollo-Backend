const config = require("./configuracion");
const crearServicio = require("./servicios/reservas");
const crearApp = require("./app");

const reservasIniciales = [
  {
    id: 1,
    estudiante: "Lisa Su",
    email: "lisa@amd.com",
    sala: "Sala Norte",
    fecha: "2026-09-23",
    turno: "Noche",
    personas: 2,
  },
  {
    id: 2,
    estudiante: "Jensen Huang",
    email: "jensen@nvidia.com",
    sala: "Sala Sur",
    fecha: "2026-09-24",
    turno: "Tarde",
    personas: 4,
  },
  {
    id: 3,
    estudiante: "Pat Gelsinger",
    email: "pat@intel.com",
    sala: "Sala Multimedia",
    fecha: "2026-09-25",
    turno: "Mañana",
    personas: 3,
  },
  {
    id: 4,
    estudiante: "Satya Nadella",
    email: "satya@microsoft.com",
    sala: "Sala Norte",
    fecha: "2026-09-26",
    turno: "Noche",
    personas: 5,
  },
];

const servicio = crearServicio(reservasIniciales);
const app = crearApp(servicio);

app.listen(config.puerto, () => {
  console.log(`Aplicación disponible en http://localhost:${config.puerto}`);
  console.log(`Entorno actual: ${config.entorno}`);
});
