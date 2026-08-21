

# Trabajo práctico 01

## Descripción

El proyecto hace dos cosas: 
    
index.js: Arma la ficha de un videojuego con datos propios, permitiendo pasar o no el nombre del estudiante por consola. Usa módulos nativos para armar la ruta, crear la carpeta salida/, guardar la ficha en ficha-videojuego.txt y mostrarla en la terminal.  

orden-event-loop.js: Muestra cómo funciona el Event Loop en consola usando setTimeout con 0 ms para ver que lo asíncrono no interrumpe el código principal.  


## Cómo ejecutar

    Abrir la terminal en la carpeta del proyecto y correr:

    Para el Event Loop:
        node orden-event-loop.js

    Para la ficha del videojuego (index):
        - node index.js Matias (en el caso de agregar nombre).
        - node index.js "Matias Ganne Moreno" (en el caso de agregar nombre completo).
        - node index.js (por defecto deja Estudiante).

## Archivo generado

    Se genera automáticamente en la raíz del proyecto al ejecutar index.js:
        - Crea la carpeta salida/.
        - Dentro guarda el archivo salida/ficha-videojuego.txt con todos los datos cargados.

## Conceptos


1. ¿Qué diferencia existe entre JavaScript, V8 y el runtime de Node.js?
    JavaScript es un lenguaje de programación. V8 se encarga de ejecutra las instrucciones de js, mientras que node es el entorno que nos permite correrlo fuera del navegador,

2. ¿Por qué el callback de setTimeout(..., 0) se ejecuta después del código principal?
    Porque el callback va a la Macrotask Queue (la cola de tareas). El Event Loop es el observador que espera a que el Call Stack esté vacío: cuando se topa con una función asíncrona como setTimeout, la delega a las APIs de Node para gestionarla en segundo plano y que el proceso no se bloquee. Una vez que termina ese reloj, pone el callback en la cola a la espera de que el Event Loop dé el okey para que se ejecute, sin interferir con las acciones síncronas del código principal.

3. ¿Cuál es la diferencia general entre I/O bloqueante y no bloqueante?
    La diferencia es que el I/O bloqueante detiene el programa por completo hasta que el disco o la red terminan de responder. En cambio, el no bloqueante manda la tarea a segundo plano y deja que el programa siga ejecutando el resto del código sin trabarse.


4. ¿Qué responsabilidades cumplen node:path y node:fs en index.js ?
    Son módulos nativos de Node. node:path sirve para armar y unir las rutas de los archivos de forma segura, y node:fs sirve para operar sobre el disco, que en este caso lo usamos para crear la carpeta salida y escribir el archivo .txt