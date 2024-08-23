
const salaModel = require("../models/salaModel")

const get = async () => {
    return await salaModel.listarSalas();
}

const criar = async (nome, senha) => {
    try {
        if(senha)
            return await salaModel.criarSala(nome, senha)
    } catch {

    }
}



module.exports = { get, criar }

