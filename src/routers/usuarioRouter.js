const express = require("express")
const router = express.Router();

router.post("/entrar", async (req, res) => {
    const usuarioController = require("../controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
})

module.exports = router