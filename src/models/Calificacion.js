// src/models/Calificacion.js
const mongoose = require('mongoose');

const CalificacionSchema = new mongoose.Schema({
    NombreEstudiante: { type: String, required: true },
    Cuatrimestre: { type: Number, required: true },
    NotaMatematicas: { type: Number, required: true },
    NotaCiencias: { type: Number, required: true },
    NotaLiteratura: { type: Number, required: true },
    NotaCivica: { type: Number, required: true },
    Condicion: { type: String, required: true }
}, { collection: 'calificaciones', versionKey: false });

module.exports = mongoose.model('Calificacion', CalificacionSchema);
