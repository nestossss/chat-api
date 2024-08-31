const salaController = require("../controllers/salaController")
const token = require('../util/token')
const express = require("express");
const { checkTokenMid } = require("../util/tokenMiddleware");
const router = express.Router();
const msgRouter = require('./mensagensRouter');

router.use('/mensagens', msgRouter);

router.get("/", checkTokenMid, async (req, res) => {
    try {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } catch {
        res.status(500).send("Erro no servidor")
     }
})

router.post( "/criar", checkTokenMid, async (req, res) => {
    try{
        let { nome, senha } = req.body;
        if((!nome && !senha) || (!nome && senha))
            return res.status(400).send("faltando nome ou senha da sala");
        let resp;
        resp = await salaController.criar(nome, senha);
        if(!resp)
            return res.sendStatus(500);
        return res.status(200).send(resp);
    }
    catch {
        res.status(500).send("Erro no servidor")
     }
});

router.put("/entrar", checkTokenMid, async(req, res) => { 
    try{
        if(!req.query.idsala) return res.status(400).send("falta idsala // url query");
        let resp = await salaController.entrar(req.query.idsala, req.headers.id);
        if(!resp)
            return res.sendStatus(500);
        return res.status(200).send(resp);
    }
    catch {
        res.status(500).send("Erro no servidor")
     }
})


router.patch("/sair", checkTokenMid, async(req, res) => {
    try{
        let resp = await salaController.sair(req.headers.id);
        if(!resp)
            return res.sendStatus(500);
        return res.status(200).send(resp);
    }
    catch {
        res.status(500).send("Erro no servidor")
     }
})

module.exports = router;