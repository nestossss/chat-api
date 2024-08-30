
const salaModel = require("../models/salaModel")

const get = async (idSala) => {
    return await salaModel.getMensagens(idSala);
}

const post = async (idSala, idUser, msg) => {
    return await salaModel.insertMensgem(idSala, idUser, msg);
}

module.exports = {
   get,
   post,
}