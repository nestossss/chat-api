const db = require('./db');

async function registrarUsuario(nick){
    return await db.insertOne("usuarios", {"nick": nick});
}

module.exports = { registrarUsuario }