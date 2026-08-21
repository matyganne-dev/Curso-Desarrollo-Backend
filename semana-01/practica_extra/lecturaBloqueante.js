const fs = require("node:fs");
console.log("1. Antes de leer");
const contenido = fs.readFileSync(__filename, "utf8");
console.log(`2. Se leyeron ${contenido.length} caracteres`);
console.log("3. Fin");
