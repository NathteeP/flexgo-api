const express = require("express")
const houseRulesController = require("../controller/houseRules")
const houseRulesRouter = express.Router()

houseRulesRouter.post("/create", houseRulesController.createRules)
houseRulesRouter.get("/accom/:accom_id", houseRulesController.findHouseRules)
houseRulesRouter.patch("/:houserules_id", houseRulesController.editHouseRules)

module.exports = houseRulesRouter
