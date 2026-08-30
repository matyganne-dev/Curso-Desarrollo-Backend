
const pc = require("picocolors");
const fs = require("node:fs/promises");
const path = require("node:path");

async function leerJson(ruta) {
    try {
        const texto = await fs.readFile(ruta, "utf8");
        return JSON.parse(texto);
    }
    catch (error) {
        console.log(pc.red("Error al leer el archivo JSON:"), error);
        throw error;
    }
}

async function escribirTexto(ruta, contenido) {
    try {
        const carpeta = path.dirname(ruta);
        await fs.mkdir(carpeta, { recursive: true });
        await fs.writeFile(ruta, contenido, "utf8");
    } catch (error) {
        console.log("Error al escribir en el archivo", error);
        throw error;
    }
}

module.exports = {
    leerJson,
    escribirTexto,
};