const express = require("express")
const roomController = require("../controller/room")
const authenticate = require("../middlewares/authenticate")
const roomRouter = express.Router()

roomRouter.post("/create", authenticate, roomController.create)

module.exports = roomRouter
