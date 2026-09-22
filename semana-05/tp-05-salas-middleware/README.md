# Trabajo práctico 05
## Descripción
Aplicación web con Express y EJS para gestionar reservas de salas de estudio. El objetivo principal de este TP es mostrar cómo funciona el "pipeline de middleware". Básicamente, es el recorrido que hace una solicitud pasando por distintas funciones (como Morgan, el medidor de tiempo y los validadores) antes de responderle al usuario.

## Instalación
1. Descargá o cloná el proyecto.
2. Abrí la terminal en la carpeta y corré `npm install`. Esto va a descargar las dependencias necesarias que dejé en el package.json (express, ejs, express-ejs-layouts y morgan).

## Ejecución
* Para arrancar el servidor: `npm start`
* Para chequear si hay algún error raro en la sintaxis antes de arrancar: `npm run check`

## Rutas
* `GET /` - Página de inicio del sitio.
* `GET /estado` - Devuelve un JSON para chequear que el server esté vivo.
* `GET /reservas` - Muestra la lista con todas las reservas.
* `GET /reservas/nueva` - Muestra el formulario para hacer una reserva.
* `GET /reservas/:id` - Muestra el detalle de una reserva específica.
* `POST /reservas` - Recibe los datos del form y los procesa.

## Pipeline de middleware

### Diagrama de un POST válido
Cuando mandás el formulario y todos los datos están bien, el recorrido es este:

POST /reservas
 ↓ morgan("dev")
 ↓ identificarSolicitud
 ↓ medirDuracion
 ↓ expressLayouts
 ↓ express.urlencoded
 ↓ reservasRouter
 ↓ prepararAreaReservas
 ↓ validarReserva
 ↓ crearReserva
 ↓ 302 /reservas
 ↓ finish: ID + estado + duración

### Diagrama de un POST inválido
Si te faltó llenar algo o pusiste letras en vez de números, la validación ataja el error y corta el recorrido antes de crear la reserva:

POST /reservas
 ↓ morgan("dev")
 ↓ identificarSolicitud
 ↓ medirDuracion
 ↓ expressLayouts
 ↓ express.urlencoded
 ↓ reservasRouter
 ↓ prepararAreaReservas
 ↓ validarReserva
 ↓ 400 render formulario (acá corta y te pide arreglar los datos)
 ↓ finish: ID + estado + duración

## Alcance de cada función
## Validación
## Pruebas manuales
## Persistencia temporal
