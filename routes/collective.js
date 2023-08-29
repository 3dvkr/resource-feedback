const express = require("express")

const { Collective } = require("../models")

const router = express.Router()


router.get("/collectives", (req, res) => {
    const collectives = Collective.findAll({})
    res.send(collectives)
})

module.exports = {
    router
}