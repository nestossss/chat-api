const msgModel = require('../models/mensagensModel');

const get = async (idSala) => {
   if(idSala)
      return await msgModel.listarMensagens(idSala);
   return console.log("idsala nao existe em get() em mensagensController");
}

const post = async (idSala, idUser, msg) => {
   if(idSala && idUser && msg)
      return await msgModel.salvarMensagem(idUser, idSala, msg);
   return console.log("idsala ou iduser ou msg nao existem em post() em mensagensController");
}

module.exports = { get, post }