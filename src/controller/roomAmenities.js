const { CustomError } = require("../config/error")
const amenityTypeService = require("../service/amenities/amenityTypeService")
const roomAmenitiesService = require("../service/amenities/roomAmenitiesService")
const roomService = require("../service/room-and-bed/roomService")
const asyncWrapper = require("../utils/asyncWrapper")

const roomAmenitiesController = {}

roomAmenitiesController.verifyUserAndRoomBeforeCreate = asyncWrapper(async (req, res, next) => {
    if (!req.body.roomId || !req.body.amenityTypeId || req.body.amenityTypeId.length < 1)
        return next(new CustomError("Please provide required information", "MissingInfo", 400))
    const user = await roomService.getUserIdByRoomId(req.body.roomId)
    if (!user) return next(new CustomError("Could not find room with this ID", "NonExist", 400))
    if (user.accom.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unauthorized", 401))

    const isAmenityIdCorrect = await amenityTypeService.findAminityTypeById(req.body.amenityTypeId)
    if (!isAmenityIdCorrect || isAmenityIdCorrect.length !== req.body.amenityTypeId.length)
        return next(new CustomError("Aminity type is invalid", "InvalidInfo", 400))
    req.amenity = isAmenityIdCorrect.map((item) => item.id)
    next()
})

roomAmenitiesController.createAmenitiesForRoom = asyncWrapper(async (req, res, next) => {
    const data = req.body.amenityTypeId.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.roomId = req.body.roomId
        objToPush.amenityTypeId = curr
        acc.push(objToPush)
        return acc
    }, [])
    const response = await roomAmenitiesService.createAmenitiesForRoom(data)
    res.status(201).json({ message: `The room ID ${req.body.roomId} has update ${response.count} amenities to their room successful!` })
})

roomAmenitiesController.deleteAmenitiesWithRoomId = asyncWrapper(async (req, res, next) => {
    const response = await roomAmenitiesService.deleteAmenitiesForRoom(req.amenity)
    res.status(204).json({ message: `The room ID ${req.body.roomId} has removed ${response.count} amenities from their room successful!` })
})

roomAmenitiesController.getAllAmenityByRoomId = asyncWrapper(async (req, res, next) => {
    if (isNaN(+req.params.room_id)) return next(new CustomError("Invalid room ID", "InvalidInfo", 400))

    const allAmenities = await roomAmenitiesService.getAllRoomAmenitiesByRoomId(+req.params.room_id)
    const amenities = allAmenities.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.amenityTypeId = curr.amenityTypeId
        objToPush.name = curr.amenityType.name
        objToPush.icon = curr.amenityType.icon
        acc.push(objToPush)
        return acc
    }, [])
    res.status(200).json(amenities)
})

module.exports = roomAmenitiesController
