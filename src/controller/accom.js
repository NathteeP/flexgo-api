const { CustomError } = require("../config/error")
const findPlacesService = require("../google-client/findPlacesService")
const geocodeService = require("../google-client/geocodeService")
const prisma = require("../models/prisma")
const accomNearbyService = require("../service/accomNearbyService")
const accomService = require("../service/accomService")
const nearbyPlaceService = require("../service/nearbyPlaceService")
const asyncWrapper = require("../utils/asyncWrapper")
const harvesineService = require("../utils/harvesineService")

const accomController = {}

accomController.verifyInfo = asyncWrapper(async (req, res, next) => {
    if (!req.body.address || !req.body.name || !req.body.description) {
        return next(new CustomError("Please provide information about your accomodation", "InvalidInfo", 400))
    }

    if (!req.body.type) {
        return next(new CustomError("Please choose your accommodation type.", "InvalidInfo", 400))
    }

    const isAddressAcquired = await accomService.findAccomByAddress(req.body.address)
    if (isAddressAcquired) {
        return next(new CustomError("This address has already been registered.", "ExistsAddress", 400))
    }
    const existsAccom = await accomService.findAccomByLatLng(req.body.lat, req.body.lng)
    if (existsAccom) {
        return next(new CustomError("This coordinates has already been registered.", "ExistsLatLng", 400))
    }

    if (!req.body.description.trim()) {
        return next(new CustomError("Please provide us your accommodation details.", "InvalidDescription", 400))
    }
    req.accom = { ...req.body, userId: req.user.id }
    const nearByPlaceArr = await findPlacesService({ lat: +req.body.lat, lng: +req.body.lng })

    const nearByPlaceIDAndDistanceArr = nearByPlaceArr.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.nearbyPlaceId = curr.id
        objToPush.distance = harvesineService(req.body.lat, req.body.lng, curr.lat, curr.lng)
        acc.push(objToPush)
        return acc
    }, [])
    console.log("nearbyplace", nearByPlaceIDAndDistanceArr)
    const nearByPlace = nearByPlaceArr.map((item) => {
        item.lat += ""
        item.lng += ""
        return item
    })
    req.nearbyPlace = nearByPlace
    req.nearByPlaceIDAndDistanceArr = nearByPlaceIDAndDistanceArr
    next()
})

accomController.createAccom = asyncWrapper(async (req, res, next) => {
    await nearbyPlaceService.createMany(req.nearbyPlace)
    const { response, result } = await accomService.createAccomTx(req.accom, req.nearByPlaceIDAndDistanceArr)
    console.log("response", response)
    console.log("result", result)
    res.status(201).json(response)
})

module.exports = accomController
