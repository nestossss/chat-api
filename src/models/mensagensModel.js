const { ObjectId } = require('mongodb');
const db = require('../models/db');

const listarMensagens = async (idSala) => {
   let mensagens = await db.findMany('mensagens', 'idsala', idSala);
   return mensagens;
}

const salvarMensagem = async (idUser, idSala, msg) => {
   let mensagem = await db.insertOne('mensagens', {
      "idsala": new ObjectId(""+idSala),
      "iduser": new ObjectId(""+idUser),
      "msg": msg
   })

   return mensagem;;
}

module.exports = { listarMensagens, salvarMensagem };