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

router.post("/criar", checkTokenMid, async (req, res) => {
        let resp = await msgController.criar();
        res.status(200).send(resp)
})

module.exports = router;