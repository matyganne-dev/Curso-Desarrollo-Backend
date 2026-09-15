# Trabajo práctico 04

## Descripción
Este es un proyecto web enfocado en el backend para gestionar un catálogo de mascotas en adopción. Está construido con Node.js, Express y EJS para renderizar las vistas dinámicamente. Permite ver la grilla de animalitos, entrar al detalle de cada uno y sumar nuevos registros mediante un formulario.

## Instalación
Para instalar todas las dependencias necesarias y dejar el entorno listo, ejecutá en la terminal:

    npm install

En la carpeta raiz.

## Ejecución
Para levantar el servidor, usá el comando:

    npm start

## Páginas y rutas
GET  / : Página inicial.

GET  /mascotas : El catálogo completo con todas las tarjetas.

GET  /mascotas/nueva : formulario para cargar una mascota.

GET  /mascotas/:id : Muestra la información detallada de una mascota específica.

POST /mascotas : La ruta que ataja el envío del formulario y procesa los datos ingresados.

## Estructura de vistas
Para mantener el código limpio y no repetir etiquetas, el frontend se dividió en tres partes usando EJS:

Layout: El archivo main.ejs funciona como plantilla principal, conteniendo el esqueleto base HTML.
Vistas: Son las pantallas dinámicas que cambian según la ruta y se inyectan en el layout.
Parciales: Componentes reutilizables como el navbar (encabezado.ejs) y el footer (pie.ejs).

## Recursos estáticos
Para que la aplicación pueda cargar los estilos CSS, las imágenes SVG y los scripts del cliente, se configuró el middleware express.static(), dándole acceso público a la carpeta public.

## Formulario
Para poder leer los datos que envía el usuario, se implementó express.urlencoded(). Al recibir un POST, el servidor extrae la información del req.body, valida los campos, genera un nuevo registro y finalmente hace una redirección (código 302) hacia el listado, evitando el reenvío accidental del formulario.

## Persistencia de los datos
Actualmente, los registros nuevos creados desde el formulario se guardan en la memoria RAM del servidor. Si el servidor se apaga o reinicia, la aplicación vuelve a leer el archivo original mascotas.json desde cero, por lo que las mascotas agregadas temporalmente no se conservan.