const express = require("express");
const { Server } = require('socket.io')
const { createServer } = require('node:http');

require('dotenv').config();

const mainRoute = require("../src/app")

const port = process.env.PORT;
const host = process.env.HOST;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    path: '/chat',
});

io.on('connect', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('send msg', ({msg, idsala}) => {
        io.emit('on chat:'+idsala, msg);
    })  
})

app.use("/", express.urlencoded({
    extended: true
}))

app.use("/", mainRoute)


server.listen(port, () => {
    console.log(`server running on port ${host}:${port}`)
})