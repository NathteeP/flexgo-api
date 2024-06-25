const { CustomError } = require("../config/error")
const findPlacesService = require("../google-client/findPlacesService")
const geocodeService = require("../google-client/geocodeService")
const prisma = require("../models/prisma")
const accomNearbyService = require("../services/accomNearbyService")
const accomService = require("../services/accomService")
const nearbyPlaceService = require("../services/nearbyPlaceService")
const asyncWrapper = require("../utils/asyncWrapper")
const harvesineService = require("../utils/harvesineService")

const accomController = {}

accomController.verifyInfo = asyncWrapper(async (req, res, next) => {
    if (!req.body.address || !req.body.name || !req.body.description) {
        return next(new CustomError("Please provide information about your accomodation", "InvalidInfo", 400))
    }

    if (!req.body.type) {
        return next(new CustomError("Please choose your ac commodation type.", "InvalidInfo", 400))
    }

    const isAddressAcquired = await accomService.findAccomByAddress(req.body.address)
    if (isAddressAcquired) {
        return next(new CustomError("This address has already been registered.", "ExistsAddress", 400))
    }
    const response = await geocodeService.findLatLngFromAddress(req.body.address)
    const existsAccom = await accomService.findAccomByLatLng(response.lat + "", response.lng + "")
    if (existsAccom) {
        return next(new CustomError("This coordinates has already been registered.", "ExistsLatLng", 400))
    }

    if (!req.body.description.trim()) {
        return next(new CustomError("Please provide us your accommodation details.", "InvalidDescription", 400))
    }
    req.body.lat = response.lat + ""
    req.body.lng = response.lng + ""
    const nearByPlaceArr = await findPlacesService({ lat: response.lat, lng: response.lng })
    // if (!nearByPlaceArr) next(new CustomError("Can't find nearby place. Please Try again", "GoogleErr", "400"))
    // const nearByPlace = nearByPlaceArr.map((item) => {
    //     item.distance = harvesineService(response.lat, response.lng, item.lat, item.lng)
    //     return item
    // })
    // const nearByPlaceIDArr = nearByPlaceArr.map((item) => item.id)
    // const repeatedNearByPlace = await nearbyPlaceService.findPlaceIdByPlaceId(nearByPlaceIDArr)
    // const filteredNearbyPlace = nearByPlaceArr.filter((item) => {
    //     if (repeatedNearByPlace.length >= 1) {
    //         for (let ele of repeatedNearByPlace) {
    //             if (ele.id === item) return false
    //         }
    //     }
    //     return item
    // })
    const nearByPlaceIDAndDistanceArr = nearByPlaceArr.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.nearbyPlaceId = curr.id
        objToPush.distance = harvesineService(response.lat, response.lng, curr.lat, curr.lng)
        acc.push(objToPush)
        return acc
    }, [])
    const nearByPlace = nearByPlaceArr.map((item) => {
        item.lat += ""
        item.lng += ""
        return item
    })
    req.body.nearbyPlace = nearByPlace
    req.body.nearByPlaceIDAndDistanceArr = nearByPlaceIDAndDistanceArr
    next()
    // await nearbyPlaceService.createMany(filteredNearbyPlace)
    // const result = await accomService.createAccom(req.body.accom)
})

accomController.createAccom = asyncWrapper(async (req, res, next) => {
    req.body.userId = 1
    await nearbyPlaceService.createMany(req.body.nearbyPlace)
    const { response, result } = await accomService.createAccomTx(req.body, req.body.nearByPlaceIDAndDistanceArr)
    // const accomNearby = req.body.nearByPlaceIDAndDistanceArr.map((item) => {
    //     item.accommodationId = response.id
    //     return item
    // })
    // console.log(accomNearby)
    // const result = await accomNearbyService.createMany(accomNearby)
    console.log("response", response)
    console.log("result", result)
    res.status(201).json(response)
})

accomController.uploadPhoto = asyncWrapper(async (req, res, next) => {})

module.exports = accomController
