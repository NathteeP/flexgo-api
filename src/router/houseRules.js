const express = require("express")
const houseRulesController = require("../controller/houseRules")
const authenticate = require("../middlewares/authenticate")
const houseRulesRouter = express.Router()

houseRulesRouter.post("/create", authenticate, houseRulesController.createRules)
houseRulesRouter.get("/accom/:accom_id", houseRulesController.findHouseRules)
houseRulesRouter.patch("/:houserules_id", authenticate, houseRulesController.editHouseRules)

module.exports = houseRulesRouter
