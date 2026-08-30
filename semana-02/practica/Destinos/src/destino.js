function formatearDestino(destino, posicion) {
    const reserva = destino.reservas ? "Requiere reserva previa" : "No requiere reserva previa";

    return `
        ${posicion + 1}. ${destino.ciudad}, ${destino.pais} 
        temporada recomendada: ${destino.temporada} 
        atractivos: ${destino.atractivos.join(", ")} 
        organizacion: ${reserva}`;

}


function crearReporte(destino) {
    const secciones = destino.map(formatearDestino);

    return `Catalogo de destino turisticos:
        ===========================
        ${secciones.join("\n")}
        ===========================
        Total de destinos: ${destino.length}
        `;
}


module.exports = {
    crearReporte,
};