const express = require("express")
const authenticate = require("../middlewares/authenticate")
const roomAmenitiesController = require("../controller/roomAmenities")
const roomAmenitiesRouter = express.Router()

roomAmenitiesRouter.post(
    "/create",
    authenticate,
    roomAmenitiesController.verifyUserAndRoomBeforeCreate,
    roomAmenitiesController.createAmenitiesForRoom,
)

roomAmenitiesRouter.post(
    "/delete",
    authenticate,
    roomAmenitiesController.verifyUserAndRoomBeforeCreate,
    roomAmenitiesController.deleteAmenitiesWithRoomId,
)

module.exports = roomAmenitiesRouter
