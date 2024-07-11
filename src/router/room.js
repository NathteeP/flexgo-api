const express = require("express")
const roomController = require("../controller/room")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/upload")
const roomRouter = express.Router()

roomRouter.post("/create", authenticate, roomController.verifyBeforeCreate, roomController.createRoom)
roomRouter.get("/:room_id", roomController.getActiveRoom)
roomRouter.get("/:room_id/accom", roomController.getRoomAndAccomByRoomId)
roomRouter.patch("/edit/:room_id", authenticate, roomController.verifyUserAndRoom, roomController.editRoomDetail)

roomRouter.delete("/delete/:room_id", authenticate, roomController.verifyUserAndRoom, roomController.deleteRoom)

roomRouter.post("/create/room-photo", authenticate, upload.single("room_image"), roomController.transactionForCreateRoomAndPhoto)

module.exports = roomRouter
