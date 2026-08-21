const fs = require("node:fs");
console.log("1. Antes de solicitar la lectura");
fs.readFile(__filename, "utf8", (error, contenido) => {
    if (error) return;
    console.log(`3. Se leyeron ${contenido.length} caracteres`);
});
console.log("2. La lectura fue solicitada");