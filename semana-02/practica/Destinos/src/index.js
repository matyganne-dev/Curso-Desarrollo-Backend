


const path = require("node:path");
const pc = require("picocolors");
const { LeerJson, EscribirTexto } = require("./archivos.js");
const { crearReporte } = require("./destino.js");

const rutasDatos = path.join(__dirname, "..", "datos", "destinos.json");

const rutaSalida = path.join(__dirname, "..", "salida", "reporte.txt");

async function main() {
    try {
        const destinos = await LeerJson(rutasDatos);
        const reporte = crearReporte(destinos);
        await EscribirTexto(rutaSalida, reporte);
        console.log(reporte);
        console.log(pc.green(`Reporte Generado exitosamente en: ${pc.cyan(rutaSalida)}`));
    } catch (error) {
        console.error(pc.red("Error en la ejecucion del programa:", error));
        process.exitCode = 1;
    }
}

main();