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
Las funciones intermedias (middlewares) se pueden aplicar a distintos niveles:
* **Globales (de aplicación):** Los activamos con `app.use()` (como `morgan` o nuestro `identificarSolicitud`). Todas las peticiones pasan por acá sí o sí.
* **De router:** Los enganchamos a un router (como `prepararAreaReservas`). Solo se ejecutan si el usuario entra a la sección de reservas.
* **De ruta:** Se ponen directamente en la ruta final (como la validación del `POST`). Solo saltan cuando le pegás a esa ruta y método exactos.

## Validación
Una regla clave acá fue poner los parsers (`express.urlencoded`) antes de hacer la validación. Esto es porque el parser es el que mastica los datos que vienen del formulario y te los deja listos adentro de `req.body`. Si pusiéramos la validación primero, `req.body` estaría vacío y no tendríamos nada que validar. 

Por otro lado, cuando una función termina su trabajo sin problemas, llama a `next()`. Esto le avisa a Express: "yo ya terminé, pasale la posta al siguiente middleware". Si no llamamos a `next()` ni respondemos, el navegador se queda cargando de forma infinita.

## Pruebas manuales
Hice todas las pruebas que pedía la matriz:
- Navegar por el sitio sin escribir URLs a mano.
- Ver cómo el ID cambia y se muestra abajo.
- Mandar el form vacío o con datos prohibidos (responde 400, muestra error y no borra lo que ya habías tipeado).
- Mandar el form perfecto (responde 302, redirecciona y muestra la reserva nueva en la lista).
- Entrar a una URL o un ID inventado para ver que devuelva la página 404.

## Persistencia temporal
Los datos del sistema viven en un array de JavaScript (`const reservas = []`). Esto significa que están en la memoria RAM. Si frenamos el servidor y lo volvemos a levantar con `npm start`, esa memoria se limpia y perdemos las altas nuevas, volviendo únicamente a las 4 reservas iniciales que dejamos escritas en el código.

Por último, cuando guardamos una reserva bien, el server responde con un estado 302 (redirección). Esto cierra esa petición y hace que el navegador automáticamente dispare una petición GET nueva a `/reservas` para mostrarte la lista actualizada.