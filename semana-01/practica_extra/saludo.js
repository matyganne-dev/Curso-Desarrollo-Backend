const nombre = process.argv[2] ?? "Estudiante";
console.log(`Bienvenido, ${nombre}`);




/* Estructura de process.argv:

        process.argv[0]: Ruta absoluta del ejecutable de Node.

        process.argv[1]: Ruta absoluta del archivo (saludo.js).

        process.argv[2]: Primer argumento personalizado que pasas (ej. "Michi").

    Lógica del código:

        process.argv[2]: Captura el primer dato que escribes tras el nombre del archivo en la terminal.

        ?? "Estudiante": Valor por defecto. Si no escribes nada (undefined), usa "Estudiante".

        `Bienvenido, ${nombre}`: Inserta la variable dentro del texto.


    Casos de ejecución:

        Con argumento:

            Comando: node saludo.js Michi
            Variable: nombre = "Michi"
            Salida: Bienvenido, Michi

        Sin argumento (caso por defecto):

            Comando: node saludo.js
            Variable: nombre = "Estudiante"
            Salida: Bienvenido, Estudiante

*/

