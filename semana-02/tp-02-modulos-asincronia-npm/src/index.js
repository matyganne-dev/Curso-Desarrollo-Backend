


const path = require("node:path");
const pc = require("picocolors");
const { leerJson, escribirTexto } = require("./archivos.js");
const { crearInforme, crearResumen } = require("./juegos.js");

const rutasDatos = path.join(__dirname, "..", "datos", "juegos.json");
//Extra
const rutaSalidaJson = path.join(__dirname, "..", "salida", "resumen.json");

const rutaSalida = path.join(__dirname, "..", "salida", "catalogo-juegos.txt");

async function main() {
    try {
        const juegos = await leerJson(rutasDatos);
        const reporte = crearInforme(juegos);
        await escribirTexto(rutaSalida, reporte);

        //Extra
        const resumen = crearResumen(juegos);
        const resumenJsonTexto = JSON.stringify(resumen, null, 2);
        await escribirTexto(rutaSalidaJson, resumenJsonTexto);
        console.log(pc.green(`Resumen JSON generado en: ${pc.cyan(rutaSalidaJson)}`));
        console.log(pc.green(`Reporte Generado exitosamente en: ${pc.cyan(rutaSalida)}`));
        console.log(pc.green(reporte));

    } catch (error) {
        console.error(pc.red("Error en la ejecucion del programa:", error));
        process.exitCode = 1;
    }
}

main();