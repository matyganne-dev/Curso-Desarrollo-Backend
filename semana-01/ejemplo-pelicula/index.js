const fs = require("node:fs");
const path = require("node:path");
const pelicula = {
    titulo: "Horizonte Infinito",
    direccion: "Alex Rivera",
    anio: 2024,
    generos: ["Ciencia ficción", "Aventura"],
    disponible: true,
};
const generosComoTexto = pelicula.generos.join(", ");
const estado = pelicula.disponible ? "Disponible" : "No disponible";
const ficha = `FICHA DE PELÍCULA
=================
Título: ${pelicula.titulo}
Dirección: ${pelicula.direccion}
Año: ${pelicula.anio}
Géneros: ${generosComoTexto}
Estado: ${estado}
`;
const carpetaSalida = path.join(__dirname, "salida");
const rutaArchivo = path.join(carpetaSalida, "ficha-pelicula.txt");
fs.mkdirSync(carpetaSalida, { recursive: true });
fs.writeFileSync(rutaArchivo, ficha, "utf8");
console.log(ficha);
console.log(`Archivo generado en: ${rutaArchivo}`);