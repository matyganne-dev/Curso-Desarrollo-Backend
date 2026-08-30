const path = require("node:path");
const pc = require("picocolors");
const { leerJson, escribirTexto } = require("./archivos.js");
const { crearInforme } = require("./informe.js");
const rutaDatos = path.join(__dirname, "..", "datos", "actividades.json");
const rutaSalida = path.join(__dirname, "..", "salida", "agenda.txt");
async function main() {
    try {
        console.log(pc.cyan("Leyendo actividades..."));
        const actividades = await leerJson(rutaDatos);
        const informe = crearInforme(actividades);
        await escribirTexto(rutaSalida, informe);
        console.log(informe);
        console.log(pc.green(`Informe generado en: ${rutaSalida}`));
    } catch (error) {
        console.error(pc.red(`No se pudo generar el informe: ${error.message}`));
        process.exitCode = 1;
    }
}
main();