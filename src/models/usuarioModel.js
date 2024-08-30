const db = require('./db');

async function registrarUsuario(nick){
    return await db.insertOne("usuarios", {
        "nick": nick,
        'salaAtual': null,
        'data_criacao': Date.now(),
    });
}

async function get(idUser){
    return await db.findOne('usuarios', idUser);
}

module.exports = { registrarUsuario, get }