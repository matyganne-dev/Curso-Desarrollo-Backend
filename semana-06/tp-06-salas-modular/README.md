# Trabajo práctico 06

## Proyecto de partida y cambios
Este proyecto es la refactorización del TP 05. La idea fue agarrar ese código donde estaba todo mezclado en el `index.js` y separarlo en módulos (rutas, controladores, servicios, etc.). Se mantuvo todo tal cual estaba funcionando, el pipeline y las vistas, pero ahora la arquitectura está ordenada y limpia en carpetas.

## Instalación y ejecución
1. Descargá o cloná el proyecto.
2. Abrí la terminal y corré `npm install` para bajar las dependencias.
3. Creá el archivo `.env` en la raíz basándote en el `.env.example`.
4. Levantá el server con `npm start`.

## Configuración del entorno
Agregué un archivo `.env` (ignoramos en Git) para manejar las variables de entorno. De ahí saco el puerto (`process.env.PORT`), así no queda fijo en el código. En `configuracion.js` valido que sea un número válido, y si falla, la aplicación se corta. Además, configuré Morgan para que cambie su formato dependiendo si el entorno es producción o desarrollo.

## Mapa de módulos y dependencias
Seguimos usando Express, EJS, express-ejs-layouts y Morgan. Agregué ESLint y Prettier como dependencias de desarrollo.
- **`src/configuracion.js`**: Levanta las variables del `.env` y valida el puerto.
- **`src/app.js`**: Configura Express, las vistas EJS y ensambla el pipeline.
- **`src/index.js`**: Es el punto de entrada, solo arranca el servidor.
- **`src/rutas/reservas.js`**: El enrutador que maneja los endpoints relativos.
- **`src/controladores/reservas.js`**: Recibe las peticiones, llama al servicio y manda la respuesta.
- **`src/servicios/reservas.js`**: Maneja el array de datos y toda la lógica.
- **`src/middleware/`**: Separé los logs de consola y las validaciones de datos en archivos aparte.

## Pipeline y contrato de rutas
El pipeline quedó exactamente igual que en el TP anterior:
Morgan -> identificarSolicitud -> medirDuracion -> expressLayouts -> estáticos -> parsers -> router de reservas -> 404 global.

**Conceptos de arquitectura:**
- El **controlador** funciona prácticamente como un puente. Se encarga de conectar el servicio con los endpoints o las peticiones que llegan, y ahí es donde se ejecuta el `res` (la respuesta).
- En el router declaro **caminos relativos** (como `/nueva` o `/:id`) para que sea un bloque modular. Si el día de mañana me piden cambiar la ruta principal de `/reservas` a otra cosa, solo lo cambio en una sola línea en `app.js` y no tengo que modificar todas las rutas una por una.

## Matriz antes/después
Antes, en el TP5, tenía todo metido en un solo archivo. Ahora, el arreglo de datos y la lógica viven solamente en `servicios/reservas.js`.
El servicio no usa `res` porque el `res` es una respuesta web, y el servicio no maneja eso. El servicio es como el cerebro: se encarga de recibir la data, agregar, buscar o modificar el array. El `res` viene de otro sector (del controlador).

| Caso --- Estado esperado --- Evidencia |

| Inicio | 200 | Navegación y solicitud ID |
| Estado | 200 | JSON con reservas actuales |
| Lista de reservas | 200 | Muestra el listado de reservas |
| Nueva reserva (GET) | 200 | Muestra el formulario vacío |
| Detalle existente | 200 | Muestra los datos de la reserva |
| Detalle inexistente | 404 | Muestra página no encontrado |
| Nueva reserva (POST) - Datos válidos | 302 | Redirige al listado |
| Nueva reserva (POST) - Datos inválidos | 400 | Renderiza form con error |

## Formato y análisis estático
Antes de probar la app corrí `npm run check` (que ejecuta ESLint y Prettier). Prettier formateó los archivos y ESLint no devolvió ningún error, asegurando que el código está limpio y sin variables sin usar.

## Persistencia temporal y limites
El único arreglo de reservas está guardado en la memoria temporal (RAM) adentro de `src/servicios/reservas.js`. El límite de esto es que si freno el servidor y lo vuelvo a arrancar, cualquier reserva que haya agregado desde el navegador se pierde y vuelven a quedar solamente las 4 iniciales que están escritas en el código.

## explicacion extra
*Servicio sin res : El servicio es el cerebro. se encarga en modificar y procesar los datos , no maneja las respuestas web, por eso no usa el res.

*Controlador Funciona como un puente que conecta las peticiones web con el servicio, y luego devuelve la respuesta final

*Cambios relativos router: se usa para que el bloque sea modular. esto sirve por si en un futuro cambia la ruta, solo se modifica una linea.

*Arreglo de reservas: viveen la memoria RAM. al reiniciar el servidor, se borran las altas nuevas y vuelven a las iniciales