
// const pc = require("picocolors");

function formatearInforme(juego, numeroRegistro) {
    // const estadoJuego = juego.disponible ? pc.green("Disponible") : pc.red("No disponible");

    const estadoJuego = juego.disponible ? "Disponible" : "No disponible";
    return `
    ${numeroRegistro + 1}. ${juego.titulo}
    Editorial y año: ${juego.editorial}, ${juego.anio}
    Participantes: ${juego.jugadoresMin} a ${juego.jugadoresMax}
    Categorías: ${juego.categorias}
    Estado: ${estadoJuego}`;
}

function crearInforme(juegos) {
    const listado = juegos.map(formatearInforme);

    return `
    CATÁLOGO DE JUEGOS DE MESA
    ==========================
    cantidad de juegos: ${listado.length} 
    ${listado.join("\n")}
    `
}

module.exports = { crearInforme };