// src/controllers/calificacionController.js
const CalificacionService = require('../services/calificacionService');

class CalificacionController {
    async getCalificaciones(req, res) {
        try {
            const calificaciones = await CalificacionService.getCalificaciones();
            res.json(calificaciones);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createCalificacion(req, res) {
        try {
            const calificacion = await CalificacionService.createCalificacion(req.body);
            res.status(201).json(calificacion);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateCalificacion(req, res) {
        try {
            const calificacion = await CalificacionService.updateCalificacion(req.params.id, req.body);
            if (!calificacion) {
                return res.status(404).json({ error: 'Calificación no encontrada' });
            }
            res.json(calificacion);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async deleteCalificacion(req, res) {
        try {
            const calificacion = await CalificacionService.deleteCalificacion(req.params.id);
            if (!calificacion) {
                return res.status(404).json({ error: 'Calificación no encontrada' });
            }
            res.json({ message: 'Calificación eliminada', calificacion });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

        async getExcelencia(req, res) {
        try {
            const nombre = req.query.nombre;
            const condicion = req.query.condicion;
            const nota = Number(req.query.nota);
            const resultado = await CalificacionService.getExcelencia(nombre, condicion, nota);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getPorNombre(req, res) {
        try {
            const cuatrimestre = Number(req.query.cuatrimestre);
            const nombre = req.query.nombre;
            const resultado = await CalificacionService.getPorNombre(cuatrimestre, nombre);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getReprobados(req, res) {
        try {
            const nota = Number(req.query.nota);
            const condicion = req.query.condicion;
            const resultado = await CalificacionService.getReprobados(nota, condicion);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getPromedioCuatrimestre(req, res) {
        try {
            const cuatrimestre = Number(req.query.cuatrimestre);
            const resultado = await CalificacionService.getPromedioCuatrimestre(cuatrimestre);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getNotaMasBaja(req, res) {
        try {
            const nombre = req.query.nombre;
            const cuatrimestre = Number(req.query.cuatrimestre);
            const resultado = await CalificacionService.getNotaMasBaja(nombre, cuatrimestre);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getPromedioLiteratura(req, res) {
        try {
            const cuatrimestre = Number(req.query.cuatrimestre);
            const resultado = await CalificacionService.getPromedioLiteratura(cuatrimestre);
            res.json(resultado);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new CalificacionController();