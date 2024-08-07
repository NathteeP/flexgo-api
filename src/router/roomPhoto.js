const express = require("express")
const authenticate = require("../middlewares/authenticate")
const roomPhotoController = require("../controller/photo/roomPhoto")
const upload = require("../middlewares/upload")
const roomPhotoRouter = express.Router()

roomPhotoRouter.post(
    "/create/:room_id",
    authenticate,
    roomPhotoController.verifyUserAndRoom,
    upload.array("room_image"),
    roomPhotoController.uploadRoomPhoto,
)

roomPhotoRouter.patch(
    "/edit/:room_id",
    authenticate,
    roomPhotoController.verifyUserAndRoom,
    upload.single("room_image"),
    roomPhotoController.editRoomPhoto,
)

roomPhotoRouter.delete("/delete/:room_id/:image_id", authenticate, roomPhotoController.verifyUserAndRoom, roomPhotoController.deleteRoomPhoto)

module.exports = roomPhotoRouter
