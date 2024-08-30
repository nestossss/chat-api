const { getCurrentRoom } = require("./usuarioController");
const salaController = require("./salaController");
const mensagensController = require('./mensagensController');

const chatSocket = (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('entrar na sala', async (args) => {
        console.log(args);
        let idSala, idUser;

        if(typeof args === 'object'){
            ({idSala, idUser} = args);
        } else {
            ({idSala, idUser} = await JSON.parse(args));
        }

        if(idSala && idUser){
            return getCurrentRoom(idUser)
            .then( (salaAtual) => {
                console.log("sala atual é string? "+ salaAtual);
                if(salaAtual != false){
                    socket.leave(salaAtual+"")
                    salaController.entrar(idSala, idUser);
                    socket.join(idSala+"");
                    socket.emit("chat", `Entrou na sala ${idSala}`);
                }                
            });
        }
    })

    socket.on('enviar mensagem', async (args) => {
        console.log(args);
        let idUser, content; 
        
        if(typeof args === 'object'){
            ({idUser, content} = args);
        } else {
            ({idUser, content} = await JSON.parse(args));
        }

        let salaAtual = Array.from(socket.rooms.keys())[1];
        if(!idUser || !content) return socket.emit('chat', "Faltando informações no envio da mensagem (idUser ou content)");
        if(!salaAtual) return socket.emit('chat', "Não conectado em nenhuma sala");
        let resp = await mensagensController.post(salaAtual, idUser, content);
        if(resp.mensagemSalva){
            return socket.broadcast.to(salaAtual).emit('chat', resp.mensagemSalva);
        }
        socket.emit('chat', 'deu errado, desculpa ToT');
    })
}

module.exports = {
   chatSocket
}

