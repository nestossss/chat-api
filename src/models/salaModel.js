const db = require('../models/db');

const listarSalas = async () => {
    let salas = await db.findAll("salas");
    return salas;
}

module.exports = { listarSalas }