# api-colegio

API REST para registrar y consultar las calificaciones de los estudiantes de un colegio, hecha con Node.js, Express, Mongoose y MongoDB.

**Contexto:** proyecto académico. Es la Simulación II del curso SC-609 Base de Datos NoSQL (Universidad Fidélitas, noviembre de 2026). El curso permitía apoyarse en inteligencia artificial y este proyecto se desarrolló con ese apoyo.

## Qué incluye

- CRUD de calificaciones organizado por capas: rutas, controladores y servicios.
- Seis consultas parametrizadas: tres con filtros (`$gte`, `$lt`, `$or`, `$regex`) y tres con agregaciones (`$match`, `$group`, `$project`).
- Validación en la base con `$jsonSchema`, en nivel estricto: se aplica al insertar y al actualizar.
- Índice compuesto `{ Cuatrimestre: 1, Condicion: 1 }`.
- Respaldo de la base generado con `mongodump`.

## Estructura

```
src/
  app.js                               servidor Express y middleware
  config/db.js                         conexión a MongoDB
  models/Calificacion.js               esquema de Mongoose
  routes/calificacionRoutes.js         método y ruta de cada endpoint
  controllers/calificacionController.js  lee la petición y arma la respuesta HTTP
  services/calificacionService.js      consultas a la base
datos/
  calificaciones.json                  30 documentos de prueba (datos ficticios)
  validador.json                       regla $jsonSchema de la colección
respaldo/                              respaldo generado con mongodump
```

## Cómo correrlo

Requisitos: Node.js, MongoDB en `localhost:27017` y MongoDB Database Tools.

```
mongorestore respaldo
npm install
npm run dev
```

`mongorestore` crea la base `ColegioAlajuela` con los 30 documentos, el validador y el índice. La API queda en `http://localhost:5000`.

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/calificaciones` | Lista todas las calificaciones |
| POST | `/api/calificaciones` | Crea una calificación (201) |
| PUT | `/api/calificaciones/:id` | Modifica una calificación (404 si el id no existe) |
| DELETE | `/api/calificaciones/:id` | Elimina una calificación (404 si el id no existe) |

### Consultas

| Ruta | Parámetros | Qué devuelve |
|---|---|---|
| `/api/consultas/excelencia` | `nombre`, `condicion`, `nota` | Registros del estudiante con las cuatro notas mayores o iguales a `nota` |
| `/api/consultas/por-nombre` | `cuatrimestre`, `nombre` | Estudiantes de un cuatrimestre cuyo nombre empieza con `nombre`, sin importar los apellidos |
| `/api/consultas/reprobados` | `nota`, `condicion` | Registros con esa condición y al menos una nota menor a `nota` |
| `/api/consultas/promedio-cuatrimestre` | `cuatrimestre` | Promedio general del cuatrimestre |
| `/api/consultas/nota-mas-baja` | `nombre`, `cuatrimestre` | La nota más baja del estudiante en ese cuatrimestre |
| `/api/consultas/promedio-literatura` | `cuatrimestre` | Promedio de Literatura del cuatrimestre |

Ejemplos con los datos de prueba:

```
GET /api/consultas/reprobados?nota=70&condicion=Reprobado          -> 6 documentos
GET /api/consultas/por-nombre?cuatrimestre=1&nombre=Gustavo%20Adolfo -> 2 documentos
GET /api/consultas/promedio-cuatrimestre?cuatrimestre=1            -> 76.8
GET /api/consultas/promedio-literatura?cuatrimestre=1              -> 79.1
```

## Reglas de validación

- `NombreEstudiante`: dos nombres y dos apellidos, solo letras.
- `Cuatrimestre`: entero mayor o igual a 1.
- Las cuatro notas: números entre 0 y 100.
- `Condicion`: `Aprobado`, `Ampliación` o `Reprobado`.

## Mejoras pendientes

- Responder 400 en vez de 500 cuando el id tiene un formato inválido o los datos no pasan la validación: son errores del cliente, no del servidor.
- Agregar la consulta de una calificación por id.
