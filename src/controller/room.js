const { CustomError } = require("../config/error")
const accomService = require("../service/accomService")
const bedTypeService = require("../service/room-and-bed/bedTypeService")
const roomAndBedService = require("../service/room-and-bed/roomAndBedService")
const roomService = require("../service/room-and-bed/roomService")
const asyncWrapper = require("../utils/asyncWrapper")

const roomController = {}

roomController.verifyBeforeCreate = asyncWrapper(async (req, res, next) => {
    if (!req.body.name || !req.body.roomType) return next(new CustomError("Required information is missing", "IncompleteInfo", 400))

    if (!req.body.bedRoom || !req.body.bathRoom || !req.body.size || !req.body.capacity || !req.body.bedType)
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
    // req.body.bedTypeId = bedTypeId
})

roomController.create = asyncWrapper(async (req, res, next) => {
    const { room, bedOfRoom } = await roomService.transactionForCreateRoomAndBed(req.body.room, req.body.bedType)
    if (!room || !bedOfRoom) return next(new CustomError("Create room unsuccess", "UnsuccessTx", 400))
    res.status(201).json({ message: `Room ID: ${room.id} has been created`, room, bedOfRoom })
})

module.exports = roomController
