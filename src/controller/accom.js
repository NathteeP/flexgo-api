const { CustomError } = require("../config/error")
const findPlacesService = require("../google-client/findPlacesService")
const accomNearbyService = require("../service/accomNearbyService")
const accomService = require("../service/accomService")
const amenityTypeService = require("../service/amenities/amenityTypeService")
const roomAmenitiesService = require("../service/amenities/roomAmenitiesService")
const nearbyPlaceService = require("../service/nearbyPlaceService")
const accomPhotoService = require("../service/photo-service/accomPhotoService")
const roomPhotoService = require("../service/photo-service/roomPhotoService")
const roomAndBedService = require("../service/room-and-bed/roomAndBedService")
const roomService = require("../service/room-and-bed/roomService")
const asyncWrapper = require("../utils/asyncWrapper")
const { findAllReviewByAccomIdService } = require("../utils/controller-service/findAllReviewByAccomId")
const { findUserHostingTime } = require("../utils/controller-service/findUserHostingTime")
const harvesineService = require("../utils/harvesineService")

const accomController = {}

accomController.verifyInfoAndFindNearbyPlaceCreate = asyncWrapper(async (req, res, next) => {
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
    const nearByPlace = nearByPlaceArr.map((item) => {
        item.lat += ""
        item.lng += ""
        return item
    })
    req.nearbyPlace = nearByPlace
    req.nearByPlaceIDAndDistanceArr = nearByPlaceIDAndDistanceArr
    next()
})

accomController.verifyUserAndAccom = asyncWrapper(async (req, res, next) => {
    if (Object.keys(req.body).length < 1 && req.route.methods.patch)
        return next(new CustomError("Please provide information for edit", "InvalidInfo", 400))
    if (!req.params.accom_id || isNaN(req.params.accom_id)) return next(new CustomError("Please provide accommodation ID", "MissingInfo", 400))
    const user = await accomService.findUserIdByAccomId(+req.params.accom_id)
    if (!user || user.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unauthorized", 401))
    const isAccomExits = await accomService.findAccomByAccomId(+req.params.accom_id)
    if (!isAccomExits) return next(new CustomError(`The accom ID :${req.params.accom_id} is not exist.`, "NonExist", 400))
    next()
})

accomController.createAccom = asyncWrapper(async (req, res, next) => {
    await nearbyPlaceService.createMany(req.nearbyPlace)
    const { response, result } = await accomService.createAccomTx(req.accom, req.nearByPlaceIDAndDistanceArr)
    res.status(201).json(response)
})

accomController.getAllRoomByAccomId = asyncWrapper(async (req, res, next) => {
    const isAccomExists = await accomService.findAccomByAccomId(+req.params.accom_id)
    if (!isAccomExists) return next(new CustomError("This accom does not exist", "NonExist", 400))

    const allRoom = await roomService.findAllRoomByAccomId(+req.params.accom_id)
    if (allRoom.length < 1) return res.status(200).json(allRoom)

    // Get Bed of all room
    const bed = await roomAndBedService.findAllBedByRoomId(allRoom.map((item) => item.id))
    const bedArr = bed.map((item) => {
        item.bedType = item.bedType.name
        return item
    })
    const bedTable = bedArr.reduce((acc, curr) => {
        if (acc[curr.roomId]) {
            acc[curr.roomId].push({ type: curr.bedType, amount: curr.amount })
            return acc
        }
        acc[curr.roomId] = []
        acc[curr.roomId].push({
            type: curr.bedType,
            amount: curr.amount,
        })

        return acc
    }, {})
    const roomAndBed = allRoom.map((item) => {
        if (bedTable[item.id]) {
            item.bed = bedTable[item.id]
        }
        return item
    })

    // Get Photo of all room
    const allRoomPhoto = await roomPhotoService.findManyPhotoByManyRoomId(allRoom.map((item) => item.id))
    const room = roomAndBed.map((item) => {
        item.photo = []
        for (let ele of allRoomPhoto) {
            if (item.id === ele.roomId) {
                item.photo.push(ele.imagePath)
                return item
            }
        }
        return item
    })

    // Get accom amenities
    const roomAmenities = await roomAmenitiesService.findManyAmenitiesByManyRoomId(allRoom.map((item) => item.id))
    const amenitiesId = roomAmenities.reduce((acc, curr) => {
        if (acc.includes(curr.amenityTypeId)) return acc
        acc.push(curr.amenityTypeId)
        return acc
    }, [])
    const amenities = await amenityTypeService.findAminityTypeById(amenitiesId)
    res.status(200).json({ room, amenities })
})

accomController.getAccomDetailByAccomId = asyncWrapper(async (req, res, next) => {
    const isAccomExists = await accomService.findAccomByAccomId(+req.params.accom_id)
    if (!isAccomExists) return next(new CustomError("This accom ID does not exist", "NonExist", 400))

    // Get all accom photo
    const accomPhoto = await accomPhotoService.getPhotoByAccomId(+req.params.accom_id)

    // Get user hosting duration
    const userHostDuration = await findUserHostingTime(isAccomExists.userId)

    const getAllReviews = await findAllReviewByAccomIdService(+req.params.accom_id)
    const allNearbyPlace = await accomNearbyService.findNearplaceByAccomId(+req.params.accom_id)
    const nearbyPlace = allNearbyPlace.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.id = curr.nearbyPlace.id
        objToPush.distance = curr.distance
        objToPush.name = curr.nearbyPlace.name
        objToPush.icon = curr.nearbyPlace.icon
        objToPush.iconBgClr = curr.nearbyPlace.iconBgClr
        acc.push(objToPush)
        return acc
    }, [])
    const accom = {
        accom: isAccomExists,
        photo: accomPhoto,
        hostDuration: userHostDuration,
        reviews: getAllReviews,
        nearbyPlace,
    }
    res.status(200).json(accom)
})

accomController.editAccomDetails = asyncWrapper(async (req, res, next) => {
    const response = await accomService.editAccomDetailsByAccomId(req.body, +req.params.accom_id)
    res.status(200).json(response)
})

accomController.deleteAccom = asyncWrapper(async (req, res, next) => {
    await accomService.changeAccomStatusToInactive(+req.params.accom_id)
    res.status(204).json({ message: "Deleted successfully!" })
})

module.exports = accomController
