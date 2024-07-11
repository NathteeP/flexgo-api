const { CustomError } = require("../../config/error")
const findPlacesService = require("../../google-client/findPlacesService")
const { transaction } = require("../../models/prisma")
const asyncWrapper = require("../../utils/asyncWrapper")
const { harvesineService } = require("../../utils/harvesineService")
const accomService = require("../accomService")

const createAccomService = async (transaction, accoms, other) => {
    const { houseRule, nearByPlace, nearByPlaceIDAndDistanceArr } = other
    await transaction.nearbyPlace.createMany({ data: nearByPlace, skipDuplicates: true })
    const response = await transaction.accom.create({ data: accoms })
    const accomNearby = nearByPlaceIDAndDistanceArr.map((item) => {
        item.accomId = response.id
        return item
    })
    await transaction.accomNearbyPlaces.createMany({ data: accomNearby })
    await transaction.houseRules.create({
        data: {
            ...houseRule,
            accomId: response.id,
        },
    })
    return response
}

const createRoomService = async (transaction, room, beds, amenities) => {
    const roomResult = await transaction.room.create({ data: room })
    const bedType = beds.map((item) => {
        item.roomId = roomResult.id
        return item
    })
    const bedOfRoom = await transaction.roomBed.createMany({ data: bedType })
    const amenitiesArr = amenities.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.amenityTypeId = curr.id
        objToPush.roomId = roomResult.id
        acc.push(objToPush)
        return acc
    }, [])
    await transaction.amenities.createMany({ data: amenitiesArr, skipDuplicates: true })
    return { roomResult, bedOfRoom }
}

const verifyRoomBeforeCreate = asyncWrapper(async (req, res, next) => {
    if (Object.keys(req.body.room).length < 1) return next(new CustomError("Required information is missing", "IncompleteInfo", 400))
    if (
        !req.body.room.bedRoom ||
        !req.body.room.bathRoom ||
        !req.body.room.size ||
        !req.body.room.capacity ||
        !req.body.room.beds ||
        !req.body.room.price ||
        !req.body.room.name
    )
        return next(new CustomError("Room information is missing", "IncompleteInfo", 400))
    const bedTypeId = await transaction.bedType.findFirst({ where: { name: req.body.room.beds.type } })
    if (!bedTypeId) return next(new CustomError("Don't have the type of bed requested. Please select the type of bed provided", "NotFound", 400))
    req.body.room.beds.id = bedTypeId.id
    delete req.body.room.beds.type
    next()
})

module.exports = { createAccomService, verifyRoomBeforeCreate, createRoomService }
