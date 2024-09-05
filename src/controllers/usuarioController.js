const token = require('../util/token');
const usuarioModel = require('../models/usuarioModel');

const entrar = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick);
    if(resp.insertedId){
        return {
            "idUser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''), nick),
            "nick": nick
        }
    }
    return {
        "erro": "erro ao entrar"
    }
}

const getCurrentRoom = async (idUser) => {
    if(isAValidID(idUser)){
        let salaAtual = (await usuarioModel.get(idUser))?.salaAtual
        if(salaAtual) return salaAtual.toString();
        return null
    }
    return false;
}

const isAValidID = (id) => {
    if(typeof id == 'string')
        return id.match(/^[0-9a-f]+$/i) && id.length == 24;
    return false;
}

module.exports = { entrar, getCurrentRoom }