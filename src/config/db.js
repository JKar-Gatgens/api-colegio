// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ColegioAlajuela',{});
        console.log('MongoDB conectado a Colegio');
    } catch (err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;