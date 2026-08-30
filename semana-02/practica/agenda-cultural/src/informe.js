function formatearActividad(actividad) {
    const entrada = actividad.gratuita ? "Entrada gratuita" : "Entrada arancelada";
    return `${actividad.fecha} | ${actividad.nombre} | ${actividad.lugar} | ${entrada}`;
}
function crearInforme(actividades) {
    const lineas = actividades.map(formatearActividad);
    return `AGENDA CULTURAL
===============
Cantidad de actividades: ${actividades.length}
${lineas.join("\n")}
`;
}
module.exports = { crearInforme };