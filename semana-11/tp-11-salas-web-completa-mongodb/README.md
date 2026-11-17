# TP 10 - Consultas de reservas paso a paso (MongoDB)

### De qué trata
Este es el TP 10, continuación del TP 09. En esta etapa me enfoqué en el diseño e implementación de consultas avanzadas sobre la base de datos `reservas_salas_u10` utilizando Mongoose. La API ahora permite filtrar por sala, ordenar por distintas variables (con desempate por ID), paginar los resultados con metadatos y aplicar proyección de campos para optimizar el rendimiento y la seguridad.

Mantuve la arquitectura de inyección de dependencias y la ejecución nativa con Node 20 (`--env-file=.env`).

### Cómo levantarlo
1. Ejecutá `npm install` para bajar las dependencias.
2. Copiá el archivo `.env.example`, renombralo a `.env` y pegá tu propia cadena de conexión de Atlas (asegurando que apunte a la BD `reservas_salas_u10`).
3. Asegurate de tener los 6 registros de prueba cargados en la colección de MongoDB.
4. Levantá el servidor con `node --env-file=.env src/index.js` (o `npm start`).

### Arquitectura y Cambios
- **Inyección de dependencias:** `app.js` instancia el servicio de Mongo una sola vez y lo pasa por parámetro a los controladores y middlewares.
- **Consultas con Mongoose:**
  - **Filtro:** Permite filtrar por `sala` de forma exacta.
  - **Ordenamiento:** Soporta `estudiante` (por defecto), `personas-asc` y `personas-desc`, aplicando siempre `_id` como criterio secundario para evitar inconsistencias.
  - **Paginación:** Implementa `pagina` (default 1) y `limite` (default 2) mediante `.skip()` y `.limit()`, devolviendo el total de documentos y cantidad de páginas.
  - **Proyección:** Uso de `.select()` para traer únicamente los campos necesarios y no exponer la versión `__v`.
- **Validaciones en API:** El controlador valida que no se envíen parámetros query no permitidos (respondiendo `400 Bad Request`).

### Endpoints
- **GET** `/api/reservas/:id`: Devuelve el detalle de una reserva específica.
- **POST** `/api/reservas`: Crea una reserva validada. 
- **PUT** `/api/reservas/:id`: Reemplazo total del recurso (exige enviar todos los campos).
- **PATCH** `/api/reservas/:id`: Modificación parcial (sólo permite actualizar `personas` y `estado`).
- **DELETE** `/api/reservas/:id`: Eliminación física del documento en la base de datos.
- **GET** `/api/reservas`: Devuelve los datos paginados, filtrados y proyectados en formato JSON con la siguiente estructura:
  ```json
  {
    "datos": [ ... ],
    "pagina": 1,
    "limite": 2,
    "total": 6,
    "paginas": 3
  }
  ```

## Justificación conceptual de relaciones (Salas y Reservas)

Si incorporáramos la entidad Sala al dominio:
- **Datos de la Sala:** Nombre/identificador, capacidad máxima, recursos disponibles (proyector, pantalla, computadoras) y ubicación.
- **Datos de la Reserva:** Fecha, turno, cantidad de personas que asistirán, estado de la reserva y datos del estudiante.

**Modelado (Referencia vs. Embebido):**
- **Uso de Referencias:** Es conveniente guardar una referencia (`salaId`) en la reserva si las salas se administran como entidades independientes, evitando duplicar información si cambian los datos de la sala.
- **Uso de Datos Embebidos:** Es conveniente embeber si se necesita guardar una foto fija de las condiciones de la sala al momento exacto de hacer la reserva, sin que cambios futuros alteren el historial.

### Seguridad
Los archivos sensibles como `.env` y el directorio `node_modules` están en el `.gitignore` para no filtrar la conexión del clúster de Atlas.