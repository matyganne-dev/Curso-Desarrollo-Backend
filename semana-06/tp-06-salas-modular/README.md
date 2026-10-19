# Trabajo práctico 06

## Proyecto de partida y cambios
Este proyecto es la refactorización del TP 05. La idea fue agarrar ese código donde estaba todo mezclado y separarlo en módulos usando Inyección de Dependencias. Se mantuvo todo tal cual estaba funcionando, el pipeline y las vistas, pero ahora la arquitectura está ordenada y limpia en carpetas.

## Instalación y ejecución
1. Descargá o cloná el proyecto.
2. Abrí la terminal y corré `npm install` para bajar las dependencias.
3. Creá el archivo `.env` en la raíz basándote en el `.env.example`.
4. Levantá el server con `npm start`.

## Configuración del entorno
Agregué la dependencia `dotenv` (y un `.env` que ignoramos en Git) para manejar las variables de entorno. De ahí saco el puerto (`process.env.PORT`). En `configuracion.js` valido estrictamente que sea un número entero entre 1 y 65535; si falla, la aplicación se corta sola. Además, configuré Morgan para que cambie a formato "combined" en producción y "dev" en desarrollo.

## Mapa de módulos y dependencias
Seguimos usando Express, EJS, express-ejs-layouts y Morgan. Agregué ESLint y Prettier como dependencias de desarrollo.
- **`src/index.js`**: Es el punto de entrada real. Acá nace la "semilla" (las 4 reservas iniciales), le paso esa semilla al servicio, se lo inyecto a la app y arranco el servidor.
- **`src/app.js`**: Configura Express, las vistas EJS y ensambla el pipeline (ya no tiene el listen acá).
- **`src/configuracion.js`**: Levanta las variables del `.env` y valida el puerto de forma aislada.
- **`src/rutas/reservas.js`**: El enrutador que maneja los endpoints relativos.
- **`src/controladores/reservas.js`**: Recibe las peticiones, llama al servicio inyectado y manda la respuesta.
- **`src/servicios/reservas.js`**: Ya no tiene el array hardcodeado adentro. Ahora es una fábrica que recibe la semilla y maneja la lógica.
- **`src/middleware/`**: Separé los logs de consola y las validaciones de datos en archivos aparte.

## Pipeline y contrato de rutas
El pipeline quedó igual que en el TP anterior:
Morgan dinámico -> identificarSolicitud -> medirDuracion -> expressLayouts -> estáticos -> parsers -> router de reservas -> 404 global.

**Conceptos de arquitectura:**
- **Servicio sin res:** El servicio es como el cerebro. Se encarga de procesar los datos y modificar el array, pero no maneja respuestas web, por eso no usa el `res`.
- **Controlador:** Funciona prácticamente como un puente que conecta las peticiones web con el servicio, y ahí es donde se devuelve la respuesta final.
- **Caminos relativos:** En el router declaro caminos relativos (como `/nueva` o `/:id`) para que el bloque sea modular. Si mañana cambia la ruta, solo se modifica una línea en `app.js`.

## Matriz antes/después
Antes, en el TP5, tenía todo metido en un solo archivo. Ahora está todo separado con Inyección de Dependencias.

| Caso | Esperado | Evidencia a registrar |
| Inicio y CSS | 200 | Navegación exitosa, CSS cargado y ID visible |
| Estado inicial | 200 | JSON en `/estado` con cantidad inicial e ID |
| Listado y detalle existente | 200 | Mismos datos y listado del TP 05 |
| Detalle inexistente | 404 | Vista HTML de error, sin caída del servidor |
| Formulario | 200 | Campos y valores de selección cargados |
| POST vacío | 400 | Vista con error, sin alta en el arreglo |
| Sala no permitida | 400 | Vista con error, sin alta |
| Email sin @ | 400 | Vista con error, sin alta |
| Personas 0, 7 o fraccionarias | 400 | Vista con error, sin alta |
| POST válido | 302 y luego 200 | Nueva reserva visible en listado y en `/estado` |
| URL inexistente | 404 | Vista HTML final de página no encontrada |
| Reinicio | 200 | Regreso a las 4 reservas de la semilla inicial |
| Puerto alternativo | 200 | El servidor responde en el puerto configurado |
| Puerto inválido | No inicia | Mensaje explícito de error en consola y corte |

## Formato y análisis estático
Antes de probar la app corrí `npm run check` (que ejecuta ESLint y Prettier). Prettier formateó los archivos y ESLint no devolvió ningún error, asegurando que el código está limpio y sin variables sin usar.

## Persistencia temporal y limites
El arreglo de reservas vive en la memoria RAM. A diferencia del TP05, ahora la semilla nace en `index.js` y se inyecta al servicio. El límite de esto es que si freno el servidor y lo vuelvo a arrancar, cualquier reserva nueva se borra y vuelven a quedar solamente las iniciales.