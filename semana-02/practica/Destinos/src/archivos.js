const fs = require("node:fs/promises");
const path = require("node:path");



//Para la prueba
//console.log(__dirname);
// const rutaPrueba = path.join(__dirname, "prueba.json");

//Leer
async function LeerJson(ruta) {
    try {
        const texto = await fs.readFile(ruta, "utf8");
        return JSON.parse(texto);
    }
    catch (error) {
        console.log("Error al leer el archivo JSON:", error);
        throw error;
    }
}

//Prueba
// LeerJson(rutaPrueba)
//     .then((data) => {
//         console.log("Contenido del archivo JSON", data);
//     })
//     .catch((error) => {
//         console.log("Error al leer el archivo JSON:", error);
//         process.exitCode = 1;
//     })


async function EscribirTexto(ruta, contenido) {
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
    LeerJson,
    EscribirTexto
};