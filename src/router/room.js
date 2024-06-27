const express = require("express")
const roomController = require("../controller/room")
const authenticate = require("../middlewares/authenticate")
const accomController = require("../controller/accom")
const roomRouter = express.Router()

roomRouter.post("/create", authenticate, roomController.verifyBeforeCreate, roomController.create)

module.exports = roomRouter
