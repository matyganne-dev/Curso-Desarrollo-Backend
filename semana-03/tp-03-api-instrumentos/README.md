# Trabajo práctico 03 - API de Instrumentos

## Descripción
Es una API básica armada con Express para manejar un catálogo de instrumentos musicales. Los datos se cargan desde un JSON al arrancar y se manejan en memoria.

## Instalación
Para instalar las dependencias necesarias, abrí la terminal en la carpeta del proyecto y ejecutá:

    npm install

## Ejecución
Para levantar el servidor, usá el comando:

    npm start

Para detener el servidor en cualquier momento, simplemente apretá Ctrl + C en la terminal.

## Endpoints
GET  / - Muestra un mensaje de bienvenida de la API.

GET  /api/instrumentos - Trae la lista completa de todos los instrumentos.

GET  /api/instrumentos?familia=cuerda - Filtra la lista por familia (ej: cuerda).

GET  /api/instrumentos/:id - Busca y devuelve un instrumento específico por su ID.

POST /api/instrumentos - Agrega un nuevo instrumento al catálogo.

## Ejemplos de solicitudes
El parámetro de ruta (/:id) sirve para buscar un recurso único y puntual (ej: buscar el instrumento 2).

El parámetro de consulta (?familia=cuerda) es una opción extra al final de la URL para filtrar una colección entera sin modificar la ruta base.

Usamos la función express.json() para que el servidor pueda recibir y entender los datos que le mandamos en formato JSON. Para crear un instrumento con el método POST, el body (cuerpo) tiene que tener esta estructura:

        {
        "nombre": "Batería",
        "familia": "Percusión",
        "origen": "Estados Unidos",
        "descripcion": "Batería acústica.",
        "disponible": true
        }


## Códigos de estado
200 OK: La solicitud fue exitosa. Se leyó bien la información (listado, filtro o detalle).

201 Created: Creado con éxito. Ocurre cuando el POST sale bien y se guarda el instrumento nuevo.

400 Bad Request: Error de solicitud. Pasa cuando te falta mandar algún dato obligatorio en el body del POST.

404 Not Found: No encontrado. Ocurre cuando buscás un ID que no existe en el catálogo.

## Persistencia de los datos
Cuando agregamos un instrumento con POST, este se guarda en la memoria RAM del servidor y lo podemos ver reflejado en el listado. Pero si apagamos el servidor y lo volvemos a prender, ese instrumento nuevo desaparece. Esto sucede porque al reiniciar, la aplicación vuelve a leer el archivo original instrumentos.json. Como nosotros no estamos escribiendo ni guardando los cambios en ese archivo físico, toda modificación queda de forma temporal exclusivamente en la memoria.