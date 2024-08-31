const express = require("express")
const router = express.Router();

router.post("/entrar", async (req, res) => {
    try{
        const usuarioController = require("../controllers/usuarioController");
        let resp = await usuarioController.entrar(req.body.nick);
        res.status(200).send(resp);
    } catch {
        res.status(500).send("Erro no servidor")
     }
})

module.exports = router