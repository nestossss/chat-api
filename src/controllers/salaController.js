
const salaModel = require("../models/salaModel")

const get = async () => {
    return await salaModel.getSalas();
}

const criar = async (nome, senha) => {
    return await salaModel.criarSala(nome, senha);  
}

const entrar = async (idSala, idUser) => {
    if(isAValidID(idSala) && isAValidID(idUser))
        return {
            "message": await salaModel.insertUser(idSala, idUser),
        }
    return {
        "message": "id inválido"
    }
}

const sair = async (idUser) => {
    if(isAValidID(idUser))
        return {
            'message': await salaModel.removeUser(idUser)
        };
    return {
        "message": "id inválido"
    }
}

const isAValidID = (id) => {
    if(typeof id == 'string')
        return id.match(/^[0-9a-f]+$/i) && id.length == 24;
    return false;
}

module.exports = { get, criar, entrar, sair }

