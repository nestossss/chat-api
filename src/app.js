const express = require("express");
const router = express.Router();
const salaRouter = require("./routers/salaRouter");
const usuarioRouter = require("./routers/usuarioRouter")
const msgRouter = require('./routers/mensagensRouter');

router.use('/salas/mensagens', msgRouter);
router.use("/salas", salaRouter);
router.use("/usuario", usuarioRouter);

router.get("/sobre", (req, res) =>{
    res.status(200).send({
        "nome": "API - CHAT",
        "versao": "0.1.0",
        "autor": "Ernesto P. B."
    })
})

module.exports = router
