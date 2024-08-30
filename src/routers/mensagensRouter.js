const msgController = require("../controllers/mensagensController")
const express = require("express");
const { checkTokenMid } = require("../util/tokenMiddleware");
const router = express.Router();

router.get("/", checkTokenMid, async (req, res) => {
   if(!req?.query?.idSala)
      return res.status(400).send("faltando idSala");
   let resp = await msgController.get(req.query.idSala);
   res.status(200).send(resp);
})

router.post("/", checkTokenMid, async (req, res) => {
   if(!req?.query?.idSala && !req.headers?.id && !req.body?.message)
      return res.status(400).send("faltando idSala");
   let resp = await msgController.post(req.query.idSala, req.headers.id, req.body.message);
   if(!resp)
      return res.status(500).send("não foi possivel enviar mensagem?");
   res.status(200).send(resp);
})

module.exports = router;