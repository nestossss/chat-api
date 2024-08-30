const salaController = require("../controllers/salaController")
const token = require('../util/token')
const express = require("express");
const { checkTokenMid } = require("../util/tokenMiddleware");
const router = express.Router();
const msgRouter = require('./mensagensRouter');

router.use('/mensagens', msgRouter);

router.get("/", checkTokenMid, async (req, res) => {
    let resp = await salaController.get();
    res.status(200).send(resp);
})

router.post( "/criar", checkTokenMid, async (req, res) => {
    let { nome, senha } = req.body;
    if((!nome && !senha) || (!nome && senha))
        res.status(400).send("faltando nome ou senha da sala");
    let resp;
    resp = await salaController.criar(nome, senha);
    if(!resp)
        return res.sendStatus(500);
    return res.status(200).send(resp);
});

router.put("/entrar", checkTokenMid, async(req, res) => {
    if(!req.query.idsala) return res.status(400).send("falta idsala // url query"); 
    let resp = await salaController.entrar(req.query.idsala, req.headers.id);
    if(!resp)
        return res.sendStatus(500);
    return res.status(200).send(resp);
})


router.patch("/sair", checkTokenMid, async(req, res) => {
    let resp = await salaController.sair(req.headers.id);
    if(!resp)
        return res.sendStatus(500);
    return res.status(200).send(resp);
})

module.exports = router;