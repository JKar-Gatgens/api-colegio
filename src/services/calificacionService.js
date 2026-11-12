const Calificacion = require('../models/Calificacion');

class CalificacionService {
    async getCalificaciones() {
        return await Calificacion.find();
    }

    async createCalificacion(data) {
        const calificacion = new Calificacion(data);
        return await calificacion.save();
    }

    async updateCalificacion(id, data) {
        return await Calificacion.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteCalificacion(id) {
        return await Calificacion.findByIdAndDelete(id);
    }

        // 4a — cada nota mayor o igual al mínimo  con la condicion aprobado
    async getExcelencia(nombre, condicion, nota) {
        return await Calificacion.find({
            NombreEstudiante: nombre,
            Condicion: condicion,
            NotaMatematicas: { $gte: nota },
            NotaCiencias: { $gte: nota },
            NotaLiteratura: { $gte: nota },
            NotaCivica: { $gte: nota }
        });
    }

    // 4b — cuatrimestre especifico con solo nombre
    async getPorNombre(cuatrimestre, nombre) {
        return await Calificacion.find({
            Cuatrimestre: cuatrimestre,
            NombreEstudiante: { $regex: '^' + nombre + ' ', $options: 'i' }
        });
    }

    // 4c — notamenor a 70 con la condicion reprobado 
    async getReprobados(nota, condicion) {
        return await Calificacion.find({
            Condicion: condicion,
            $or: [
                { NotaMatematicas: { $lt: nota } },
                { NotaCiencias: { $lt: nota } },
                { NotaLiteratura: { $lt: nota } },
                { NotaCivica: { $lt: nota } }
            ]
        });
    }

    // 4d — promedio general para un cuatrimestre especifico
    async getPromedioCuatrimestre(cuatrimestre) {
        return await Calificacion.aggregate([
            { $match: { Cuatrimestre: cuatrimestre } },
            { $group: {
                _id: '$Cuatrimestre',
                promedioGeneral: { $avg: { $avg: ['$NotaMatematicas', '$NotaCiencias', '$NotaLiteratura', '$NotaCivica'] } }
            } },
            { $project: { promedioGeneral: { $round: ['$promedioGeneral', 2] } } }
        ]);
    }

    // 4e — $min compara las 4 notas del documento y se queda con la menor
    async getNotaMasBaja(nombre, cuatrimestre) {
        return await Calificacion.aggregate([
            { $match: { NombreEstudiante: nombre, Cuatrimestre: cuatrimestre } },
            { $project: {
                _id: 0,
                NombreEstudiante: 1,
                Cuatrimestre: 1,
                notaMasBaja: { $min: ['$NotaMatematicas', '$NotaCiencias', '$NotaLiteratura', '$NotaCivica'] }
            } }
        ]);
    }

    // 4f — promedio de una sola columna para el cuatrimestre
    async getPromedioLiteratura(cuatrimestre) {
        return await Calificacion.aggregate([
            { $match: { Cuatrimestre: cuatrimestre } },
            { $group: { _id: '$Cuatrimestre', promedioLiteratura: { $avg: '$NotaLiteratura' } } },
            { $project: { promedioLiteratura: { $round: ['$promedioLiteratura', 2] } } }
        ]);
    }
}

module.exports = new CalificacionService();