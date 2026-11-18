# TP 11 - Edición de reservas y actualización (MongoDB)

### De qué trata
Este es el TP 11, continuación del TP 10. En esta etapa me enfoqué en el diseño e implementación de la funcionalidad de edición y actualización de reservas, integrando la vista de edición, el controlador con sus respectivas reglas de negocio, el ruteo específico y el manejo de errores para conservar los datos ante fallas de validación.

Mantuve la arquitectura de inyección de dependencias y la ejecución nativa con Node 20 (`--env-file=.env`).

### Cómo levantarlo
1. Ejecutá `npm install` para bajar las dependencias.
2. Copiá el archivo `.env.example`, renombralo a `.env` y pegá tu propia cadena de conexión de Atlas (asegurando que apunte a la BD `reservas_salas_u11`).
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
- **Flujo de Edición Web:** Incorporación de las rutas específicas (`/:id/editar`) ubicadas antes del parámetro dinámico, los métodos en el controlador (`mostrarEdicion` y `guardarEdicion`), y el ajuste en el middleware de errores para preservar los datos en el formulario ante fallas de validación.

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

### Casos de Prueba y Evidencia de Ejecución

| Caso | Resultado esperado |
| :--- | :--- |
| **Abrir edición** | Siete campos precargados correctamente con los datos actuales del registro. |
| **Guardar desde web** | Redirección HTTP `303`, manteniendo el mismo ID y reflejando los datos actualizados mediante la API. |
| **Cancelar** | El documento permanece intacto en la base de datos sin modificaciones. |
| **Formulario inválido** | Respuesta HTTP `400` en HTML y retención de los valores ingresados en los campos para no perder el progreso. |
| **PUT completo** | Respuesta JSON `200`, conservando el mismo ID y actualizando la precarga web. |
| **PUT incompleto** | Respuesta `400 Bad Request` sin aplicar cambios en el registro. |
| **ID inválido / válido ausente** | Respuesta HTML `400` o `404` según corresponda. |
| **Reiniciar** | Persistencia del reemplazo válido tras reiniciar el servidor, sin duplicar registros. |
| **Funcionalidades previas** | Creación, lectura, filtrado y paginación continúan funcionando con normalidad. |

### Seguridad
Los archivos sensibles como `.env` y el directorio `node_modules` están en el `.gitignore` para no filtrar la conexión del clúster de Atlas.