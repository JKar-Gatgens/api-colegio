//  src/routes/calificacionRoutes.js
const express = require('express');
const router = express.Router();
const CalificacionController = require('../controllers/calificacionController');

router.get('/calificaciones', CalificacionController.getCalificaciones);
router.post('/calificaciones', CalificacionController.createCalificacion);
router.put('/calificaciones/:id', CalificacionController.updateCalificacion);
router.delete('/calificaciones/:id', CalificacionController.deleteCalificacion);
router.get('/consultas/excelencia', CalificacionController.getExcelencia);
router.get('/consultas/por-nombre', CalificacionController.getPorNombre);
router.get('/consultas/reprobados', CalificacionController.getReprobados);
router.get('/consultas/promedio-cuatrimestre', CalificacionController.getPromedioCuatrimestre);
router.get('/consultas/nota-mas-baja', CalificacionController.getNotaMasBaja);
router.get('/consultas/promedio-literatura', CalificacionController.getPromedioLiteratura);

module.exports = router;