//Parte 1

const fs = require("node:fs");
const path = require("node:path");

/*
Recibir el nombre del estudiante mediante process.argv.
-Utilizar un nombre alternativo cuando no se proporcione un argumento.
-Mostrar process.version y process.platform.
*/


const nombre = process.argv[2] ?? "Estudiante";
console.log(`Bienvenido, ${nombre}`);

/*
Crear un objeto con estas propiedades
titulo          Texto       Título del videojuego
estudio         Texto       Estudio o empresa responsable
anio Número     Año de      publicación
plataformas     Arreglo     Al menos dos elementos
multijugador    Booleano    true o false
*/

const videojuego = {
    titulo: "Cyberpunk 2077",
    estudio: "CD PROJEKT RED",
    anio: 2020,
    plataformas: [
        "PC",
        "PlayStation 4",
        "PlayStation 5",
        "Xbox One",
        "Xbox Series X|S",
        "Nintendo Switch 2",
        "macOS",
    ],
    multijugador: true,
}

//Convertir plataformas en un texto mediante join
const plataformasListado = videojuego.plataformas.join(", ");
//Convertir multijugador en "Sí" o "No" mediante un operador condicional.
const juegoMultijugador = videojuego.multijugador ? "Si" : "No";
//Reunir los datos en un template literal.

const ficha = `
FICHA DE VIDEOJUEGO
===================
Estudiante: ${nombre}
Node.js: ${process.version}
Plataforma del sistema: ${process.platform}
Título: ${videojuego.titulo}
Estudio: ${videojuego.estudio}
Año: ${videojuego.anio}
Plataformas: ${plataformasListado}
¿Es multijugador?: ${juegoMultijugador}
`;

//ruta carpeta + "salida"
const carpetaSalida = path.join(__dirname, "salida");
//ruta archivo
const archivoRuta = path.join(carpetaSalida, "ficha-videojuego.txt");
//crear salida
fs.mkdirSync(carpetaSalida, { recursive: true });
//Generar salida
fs.writeFileSync(archivoRuta, ficha, "utf-8");

// prueba de ficha
console.log(ficha);

console.log(`Archivo generado en: ${archivoRuta}`);