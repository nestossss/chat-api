const salaController = require("../controllers/salaController")
const token = require('../util/token')
const express = require("express");
const { checkTokenMid } = require("../util/tokenMiddleware");
const router = express.Router();

router.get("/", checkTokenMid, async (req, res) => {
    let resp = await salaController.get();
    res.status(200).send(resp);
})

router.post( "/criar", checkTokenMid, async (req, res) => {
        let resp = await salaController.criar();
        res.status(200).send(resp)
})

module.exports = router;