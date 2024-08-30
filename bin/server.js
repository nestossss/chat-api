const express = require("express");
const cors = require('cors');
const { Server } = require('socket.io')
const { createServer } = require('node:http');
require('dotenv').config();

const mainRoute = require("../src/app");
const { chatSocket } = require("../src/controllers/chatSocket");

const port = process.env.PORT;
const host = process.env.HOST;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    path: '/chat',
});

io.on('connect', chatSocket)

app.use(cors());
app.use("/", express.urlencoded({
    extended: true
}))
app.use("/", mainRoute)


server.listen(port, () => {
    console.log(`server running on port ${host}:${port}`)
})