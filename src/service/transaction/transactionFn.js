const { CustomError } = require("../../config/error")
const findPlacesService = require("../../google-client/findPlacesService")
const { transaction } = require("../../models/prisma")
const asyncWrapper = require("../../utils/asyncWrapper")
const { harvesineService } = require("../../utils/harvesineService")
const accomService = require("../accomService")

const verifyAccomBeforeCreate = async (req, res, next, transaction) => {
    try {
        if (!req.body.accom.address || !req.body.accom.name || !req.body.accom.description || !req.body.accom.coordinate) {
            return next(new CustomError("Please provide information about your accomodation", "InvalidInfo", 400))
        }
        if (!req.body.accom.type) return next(new CustomError("Please choose your accommodation type.", "InvalidInfo", 400))

        if (!req.body.accom.houseRule) return next(new CustomError("Please provide house rules for your accommodation", "InvalidInfo", 400))
        const isAddressAcquired = await transaction.accom.findFirst({
            where: {
                address: {
                    equals: req.body.accom.address,
                },
            },
        })
        if (isAddressAcquired) return next(new CustomError("This address has already been registered.", "ExistsAddress", 400))

        const { lat, lng } = req.body.accom.coordinate
        const existsCoordinate = await transaction.accom.findFirst({
            where: {
                lat: lat,
                lng: lng,
            },
        })
        if (existsCoordinate) return next(new CustomError("This coordinates has already been registered.", "ExistsLatLng", 400))

        const nearbyPlaceArr = await findPlacesService({ lat: +lat, lng: +lng })

        const nearByPlaceIDAndDistanceArr = nearbyPlaceArr.reduce((acc, curr) => {
            const objToPush = {}
            objToPush.nearbyPlaceId = curr.id
            objToPush.distance = harvesineService(+lat, +lng, +curr.lat, +curr.lng)
            acc.push(objToPush)
            return acc
        }, [])
        const nearByPlace = nearbyPlaceArr.map((item) => {
            item.lat += ""
            item.lng += ""
            return item
        })
        req.body.accom.lat = lat
        req.body.accom.lng = lng

        const houseRule = req.body.accom.houseRule

        delete req.body.accom.coordinate
        delete req.body.accom.houseRule

        const accom = { ...req.body.accom, userId: req.user.id }
        return { accom, houseRule, nearByPlace, nearByPlaceIDAndDistanceArr }
    } catch (err) {
        next(err)
    }
}

const createAccomService = async (req, res, next, transaction, accoms) => {
    try {
        const { houseRule, nearByPlace, accom, nearByPlaceIDAndDistanceArr } = accoms
        await transaction.nearbyPlace.createMany({ data: nearByPlace, skipDuplicates: true })
        const response = await transaction.accom.create({ data: accom })
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
    } catch (err) {
        next(err)
    }
}

const createRoomService = async (req, res, next, transaction, room, beds, amenities) => {
    try {
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
    } catch (err) {
        next(err)
    }
}

const verifyRoomBeforeCreate = async (req, res, next, transaction) => {
    try {
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
        const { beds } = req.body.room
        const bedTypeId = await transaction.bedType.findFirst({ where: { name: beds.type } })
        if (!bedTypeId) return next(new CustomError("Don't have the type of bed requested. Please select the type of bed provided", "NotFound", 400))
        beds.id = bedTypeId.id
        const amenities = req.body.room.amenities
        delete beds.type
        delete req.body.room.beds
        delete req.body.room.amenities
        return { room: req.body.room, beds, amenities }
    } catch (err) {
        next(err)
    }
}

module.exports = { createAccomService, verifyRoomBeforeCreate, verifyAccomBeforeCreate, createRoomService }
