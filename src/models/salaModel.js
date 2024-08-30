const { ObjectId } = require('mongodb');
const db = require('../models/db');

const getSalas = async () => {
    let salas = await db.findAll("salas");
    return salas;
}

const criarSala = async (nomeSala, senhaSala) => {
    let salaExiste = await db.findMany('salas', 'nome', nomeSala);
    if(salaExiste.length > 0) 
        return {
            'message': 'sala c esse nome ja existe'
        }
    
    let sala = {
        "nome": nomeSala,
        "mensagens": [],
        "tipo": "publica",
    }
    if(senhaSala){
        sala = {
            ...sala,
            "tipo": "privada",
            "senha": senhaSala,
        }
    }
    sala = {
        ...sala,
        "data_criacao": Date.now(), 
    }  
    let salaCriada = await db.insertOne('salas', sala);
    if(salaCriada.insertedId){
        return {
            "idSala": salaCriada.insertedId,
            "message": "Sala criada com sucesso"
        }
    }
    return {
        "message": "Sala não foi criada"
    }
}

const insertUser = async (idSala, idUser) => {
    let salaExiste = await db.findOne('salas', idSala);
    if(!salaExiste) return 'sala nao existe';
    
    let update = await db.updateOne('usuarios', idUser, {
        $set: {
            'salaAtual': new ObjectId(idSala+"")
        }
    });
    if(update) return "ok";
    return "erro"
}

const removeUser = async (idUser) => {
    let update = await db.updateOne('usuarios', idUser, {
        $set: {
            "salaAtual": null,
        }
    });
    if(update) return 'ok';
    return 'erro'
}

const getMensagens = async (idSala) => {
    let mensagens = (await db.findOne('salas', idSala))?.mensagens;
    if(mensagens) return mensagens;
    return 'sala não existe'
}

const insertMensgem = async (idSala, idUser, msg) => {
    let user = await db.findOne('usuarios', idUser);
    let nick = user.nick
    let timestamp = Date.now();

    if(user.salaAtual.toString() != idSala)
        return {
            'message': 'sala errada filhaooo',
        }
    let query = {
        $push: { 
            'mensagens': {
                "content": msg,
                "usuario": nick,
                "timestamp": timestamp,
            }
        }
    };
    let update = await db.updateOne('salas', idSala, query);
    if(update) 
        return {
            'mensagemSalva': query.$push.mensagens,
            'message': 'ok'
        };
    return {
        'message': 'ok',
    }
}


module.exports = { getSalas, criarSala, insertUser, removeUser, insertMensgem, getMensagens}