const { CustomError } = require("../config/error")
const accomService = require("../service/accomService")
const bedTypeService = require("../service/room-and-bed/bedTypeService")
const roomAndBedService = require("../service/room-and-bed/roomAndBedService")
const roomService = require("../service/room-and-bed/roomService")
const asyncWrapper = require("../utils/asyncWrapper")

const roomController = {}

roomController.verifyBeforeCreate = asyncWrapper(async (req, res, next) => {
    if (!req.body.name || !req.body.roomType) return next(new CustomError("Required information is missing", "IncompleteInfo", 400))

    if (!req.body.bedRoom || !req.body.bathRoom || !req.body.size || !req.body.capacity || !req.body.bedType || !req.body.price)
        return next(new CustomError("Room information is missing", "IncompleteInfo", 400))

    if (isNaN(req.body.accomId)) return next(new CustomError("Invalid ID provided", "InvalidInfo", 400))

    const isAccomExists = await accomService.findAccomByAccomId(req.body.accomId)
    if (!isAccomExists) return next(new CustomError("There is no accommodation with this id in database", "InvalidID", 400))

    if (isAccomExists.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unathorized", 401))

    const bedTypeName = req.body.bedType.reduce((acc, curr) => {
        acc.push(curr.name)
        return acc
    }, [])

    const bedTypeId = await bedTypeService.findManyBedTypeIdByBedType(bedTypeName)
    if (bedTypeId.length !== bedTypeName.length)
        return next(new CustomError("Don't have the type of bed requested. Please select the type of bed provided", "NotFound", 400))

    const bedTypeIdAndAmount = bedTypeId.map((item) => {
        const foundIndex = req.body.bedType.findIndex((request) => request.name === item.name)
        if (foundIndex === -1) return next(new CustomError("Error", "Error", 400))
        item.bedTypeId = item.id
        item.amount = req.body.bedType[foundIndex].amount
        delete item.id
        delete item.name
        return item
    })

    delete req.body.bedType
    req.body.room = { ...req.body }
    req.body.bedType = bedTypeIdAndAmount
    next()
})

roomController.verifyUserAndRoom = asyncWrapper(async (req, res, next) => {
    if (Object.keys(req.body).length < 1 && req.route.methods.patch)
        return next(new CustomError("Please provide information for edit", "InvalidInfo", 400))
    if (isNaN(req.params.room_id)) return next(new CustomError("Please provide roomID", "MissingInfo", 400))
    const room = await roomService.getRoomAndBedByRooomId(+req.params.room_id)
    if (!room) return next(new CustomError(`The room ID ${req.params.room_id} is not exist`, "NonExist", 400))
    const user = await roomService.getUserIdByRoomId(+req.params.room_id)
    if (!user || user.accom.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unauthorized", 401))
    next()
})

roomController.createRoom = asyncWrapper(async (req, res, next) => {
    const { room, bedOfRoom } = await roomService.transactionForCreateRoomAndBed(req.body.room, req.body.bedType)
    if (!room || !bedOfRoom) return next(new CustomError("Create room unsuccess", "UnsuccessTx", 400))
    res.status(201).json({ message: `Room ID: ${room.id} has been created`, room, bedOfRoom })
})

roomController.getActiveRoom = asyncWrapper(async (req, res, next) => {
    const response = await roomService.getRoomAndBedByRooomId(+req.params.room_id)
    if (!response) return next(new CustomError("Can not find this room in the database", "NotExist", 400))
    const newRoomBed = response.roomBed.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.amount = curr.amount
        objToPush.name = curr.bedType.name
        acc.push(objToPush)
        return acc
    }, [])
    response.roomBed = newRoomBed
    res.status(200).json(response)
})

roomController.editRoomDetail = asyncWrapper(async (req, res, next) => {
    const response = await roomService.editRoomDetailsByRoomId(req.body, +req.params.room_id)
    res.status(200).json(response)
})

roomController.deleteRoom = asyncWrapper(async (req, res, next) => {
    await roomService.changeRoomStatusToInAcvie(+req.params.room_id)
    res.status(204).json({ message: `The room ID ${req.params.room_id} has changed to INACTIVE` })
})

roomController.getRoomAndAccomByRoomId = asyncWrapper(async (req, res, next) => {
    const response = await roomService.getUserIdByRoomId(+req.params.room_id)
    res.status(200).json(response)
})

module.exports = roomController
