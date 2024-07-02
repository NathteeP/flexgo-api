const express = require("express")
const roomController = require("../controller/room")
const authenticate = require("../middlewares/authenticate")
const accomController = require("../controller/accom")
const roomRouter = express.Router()

roomRouter.post("/create", authenticate, roomController.verifyBeforeCreate, roomController.createRoom)
roomRouter.get("/:room_id", roomController.getActiveRoom)

roomRouter.patch("/edit/:room_id", authenticate, roomController.verifyUserAndRoom, roomController.editRoomDetail)

roomRouter.delete("/delete/:room_id", authenticate, roomController.verifyUserAndRoom, roomController.deleteRoom)

module.exports = roomRouter
