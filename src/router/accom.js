const express = require("express")
const accomController = require("../controller/accom")
const authenticate = require("../middlewares/authenticate")
const accomRouter = express.Router()

accomRouter.post("/create", accomController.create)

module.exports = accomRouter
