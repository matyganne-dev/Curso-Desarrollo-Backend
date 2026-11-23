# TP 12 - Cambio parcial de estado y eliminación con confirmación (MongoDB)

### De qué trata
Este es el TP 12, continuación del TP 11. En esta etapa agregué el cambio parcial del campo `estado` (`pendiente` o `confirmada`) y la eliminación de reservas con pantalla de confirmación previa en la interfaz web, manteniendo las validaciones estrictas para no modificar ni borrar datos por accidente o con envíos incompletos.

Se mantiene la arquitectura de inyección de dependencias y la ejecución nativa con Node 20 (`--env-file=.env`).

### Cómo levantarlo
1. Ejecutá `npm install` para bajar las dependencias.
2. Copiá el archivo `.env.example`, renombralo a `.env` y pegá tu propia cadena de conexión de Atlas (asegurando que apunte a la BD `reservas_salas_u12` o la base configurada para el TP).
3. Asegurate de tener los registros de prueba cargados en la colección de MongoDB.
4. Levantá el servidor con `node --env-file=.env src/index.js` (o `npm start`).

### Arquitectura, Campos y Diferencias Web / API
- **Inyección de dependencias:** `app.js` instancia el servicio de Mongo una sola vez y lo pasa por parámetro a los controladores y middlewares.
- **Campos admitidos en reservas:** `estudiante`, `email`, `sala` (`Sala Norte`, `Sala Sur`, `Sala Este`, `Sala Oeste`), `fecha` (`YYYY-MM-DD`), `turno` (`Mañana`, `Tarde`, `Noche`), `personas` (entero positivo) y `estado` (`pendiente` o `confirmada`).
- **Diferencia entre `POST` web y `PATCH` / `DELETE` API:**
  - En la **web** (`POST /reservas/:id/estado` y `POST /reservas/:id/eliminar`), los datos llegan como `application/x-www-form-urlencoded`, exigen exactamente el campo esperado (`estado` o `confirmar=si`) sin campos extra ni repetidos, y ante éxito responden con redirección HTTP `303` (`Location` al detalle o al listado). Si hay error de validación responden `400` renderizando la vista HTML.
  - En la **API** (`PATCH /api/reservas/:id` y `DELETE /api/reservas/:id`), se trabaja con JSON / sin cuerpo: `PATCH` actualiza solo `estado` devolviendo `200` con el recurso actualizado, y `DELETE` elimina el registro devolviendo `204` sin cuerpo (`400` ante payload inválido o ID mal formado, `404` si no existe).
- **Flujo Web de Estado y Eliminación:** Rutas específicas (`/:id/estado` y `/:id/eliminar`) ubicadas antes de `/:id`. Tanto el `GET` de confirmación como el botón **Cancelar** son de solo lectura y no escriben ni borran datos.

### Rutas y Endpoints

**Rutas Web**
- **GET** `/reservas` y **GET** `/reservas/:id`: Listado y detalle de reservas (`200`, `400` ID inválido, `404` inexistente).
- **GET / POST** `/reservas/nueva` y `/reservas/:id/editar`: Alta y edición completa (`303` en éxito, `400` en error).
- **GET / POST** `/reservas/:id/estado`: Formulario y actualización parcial solo de `estado` (`303` a `/reservas/:id` | `400` | `404`).
- **GET / POST** `/reservas/:id/eliminar`: Confirmación de lectura (`200`) y borrado físico si recibe únicamente `confirmar=si` (`303` a `/reservas` | `400` | `404`).

**Endpoints API**
- **GET** `/api/reservas`: Devuelve los datos paginados, filtrados y proyectados en formato JSON (`200`).
- **GET** `/api/reservas/:id`: Devuelve el detalle de una reserva específica (`200` | `400` | `404`).
- **POST** `/api/reservas`: Crea una reserva validada (`201` | `400`).
- **PUT** `/api/reservas/:id`: Reemplazo total del recurso (`200` | `400` | `404`).
- **PATCH** `/api/reservas/:id`: Modificación parcial de `estado` (`200` | `400` | `404`).
- **DELETE** `/api/reservas/:id`: Eliminación física del documento (`204` sin cuerpo | `400` | `404`).

### Casos de Prueba y Evidencia de Ejecución

| Caso | Resultado observado | Evidencia / Verificación |
| :--- | :--- | :--- |
| **Cambio parcial API (`PATCH`)** | `200` con mismo ID (`6b0494a32b3495162d102f26`) y `estado` actualizado de `"pendiente"` a `"confirmada"`. | Los otros 6 campos (`Ana Ejemplo 2`, `ana@example.com`, `Sala Norte`, `2026-11-11`, `Mañana`, `2`) quedaron intactos en API y web. |
| **PATCH inválido (`{}` / `"inventado"`)** | Respuesta `400` (`El estado debe ser 'pendiente' o 'confirmada'.`). | `GET` posterior confirmó que el documento no cambió. |
| **Cambio parcial Web (`POST .../estado`)** | `303 See Other` hacia `/reservas/6b0494a32b3495162d102f26` con `estado=pendiente`. | `GET` posterior confirmó vuelta a `"pendiente"` y 6 campos conservados. |
| **POST estado inválido** | `400` en HTML ante valor inventado, cuerpo vacío, campo extra (`personas=5`) y clave repetida. | El documento de Ana permaneció intacto en cada caso. |
| **Cancelar y GET de eliminación** | `GET /reservas/6b04a8f7da0ee449454a6a7b/eliminar` devolvió `200` sin borrar; **Cancelar** volvió sin escribir. | `GET /api/reservas/6b04a8f7da0ee449454a6a7b` siguió devolviendo `200` con Bruno Ejemplo intacto. |
| **POST eliminar inválido** | `400` en HTML ante cuerpo vacío, `confirmar=no`, campo extra y `confirmar` repetido. | El registro de Bruno permaneció intacto en la base. |
| **POST eliminar (`confirmar=si`)** | Redirección `303` hacia `/reservas` y borrado definitivo. | `GET` y `POST` repetidos sobre Bruno devolvieron `404`; Ana siguió activa (`200`). |
| **DELETE API** | Respuesta `204 No Content` sin cuerpo sobre registro descartable; repetición devolvió `404`. | Registro eliminado físicamente sin dejar restos. |
| **ID inválido / borrado concurrente** | `GET /reservas/abc/estado` devolvió `400`; envío sobre registro ya borrado devolvió `404`. | No se recreó el documento eliminado. |
| **Reinicio y funciones previas** | Persistencia del estado de Ana y ausencia de registros borrados tras reiniciar Node. | Alta, listado, edición completa (`PUT`/web) y consultas API siguen operativos. |

### Seguridad
Los archivos sensibles como `.env` y el directorio `node_modules` están en el `.gitignore` para no filtrar la conexión del clúster de Atlas.