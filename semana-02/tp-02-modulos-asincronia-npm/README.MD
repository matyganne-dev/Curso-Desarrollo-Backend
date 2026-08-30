# Trabajo práctico 02

## Descripción

    Aplicación de consola desarrollada en Node.js que lee un catálogo de juegos de mesa desde un archivo JSON, transforma y formatea los datos para generar un reporte en texto plano (`catalogo-juegos.txt`) y un extra archivo adicional con estadísticas (`resumen.json`).

## Instalación

    Clonar el repositorio y ejecutar en la raíz del proyecto para instalar las dependencias declaradas:
    npm install

## Ejecución

    verificar los modulos:

        npm run check

    Iniciar la app:

        npm start

## Estructura del proyecto

    tp-02-modulos-asincronia-npm/
    |-- datos/
    |   `-- juegos.json
    |-- src/
    |   |-- archivos.js
    |   |-- juegos.js
    |   `-- index.js
    |-- salida/
    |   `-- catalogo-juegos.txt
    |-- .gitignore
    |-- package.json
    |-- package-lock.json
    `-- README.md

## Flujo asíncrono

    El asincronismo está presente en archivos.js y se coordina en index.js mediante async/await.

## Dependencias

    picocolors (^1.1.1)

## Preguntas a responder
1. ¿Qué responsabilidad tiene cada módulo?

    archivos.js:Lee archivos y parsea su contenido JSON (leerJson), y crea carpetas si no existen para guardar archivos de texto o JSON (escribirTexto).

    juegos.js: Contiene la lógica del catálogo. Recibe los datos en crudo y genera el reporte (crearInforme) o el objeto con las estadísticas requeridas (crearResumen).

    index.js:Importa los módulos anteriores, arma las rutas con path, ejecuta el flujo de trabajo dentro de una función main y maneja los errores y mensajes por consola.

2. ¿Qué diferencia existe entre exportar una función y ejecutarla?

    Exportar es poner a disposición funciones para que otros módulos puedan importarla y reutilizarla sin correr su código. Ejecutar es invocarla la funcion para que realice su tarea y devuelva un resultado.

3. ¿Qué representa la promesa devuelta por fs.readFile ?

    Representa una operación asíncrona pendiente de primeras a la espera de que vuelva una respuesta exitosa o un rechazo.

4. ¿Por qué await se utiliza dentro de una función async ?

    await le indica a JavaScript que pause de manera no bloqueante la ejecución de esa función hasta que una promesa se resuelva.

5. ¿Qué errores pueden llegar al catch de main ?

    Cualquier fallo que ocurra durante la ejecución

6. ¿Por qué se publican package.json y package-lock.json , pero no node_modules ?

    package.json y package-lock.json son archivos livianos de configuración que detallan el nombre exacto y las versiones de las librerías necesarias, mientras que node_modules contiene los archivos pesados descargados.

7. ¿Para qué se utiliza picocolors y por qué figura en dependencies ?

    Se utiliza para destacar los textos en la terminal. figura en dependencies porque el programa la necesita al ejecutarse con npm start.