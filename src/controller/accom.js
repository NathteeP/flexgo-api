const { CustomError } = require("../config/error")
const { defaultCoordinate, defaultDistance } = require("../constant/defaults")
const findPlacesService = require("../google-client/findPlacesService")
const accomNearbyService = require("../service/accomNearbyService")
const accomService = require("../service/accomService")
const nearbyPlaceService = require("../service/nearbyPlaceService")
const accomPhotoService = require("../service/photo-service/accomPhotoService")
const reservationService = require("../service/reservationService")
const roomService = require("../service/room-and-bed/roomService")
const asyncWrapper = require("../utils/asyncWrapper")
const { findAllReviewByAccomIdService, getFeaturedReviewByAccomIdService } = require("../utils/controller-service/findAllReviewByAccomId")
const { findUserHostingTime } = require("../utils/controller-service/findUserHostingTime")
const { harvesineService, createBoundingBox } = require("../utils/harvesineService")
const getAccomDetailAndRoomService = require("../utils/controller-service/getAccomDetailAndRoom")
const userPhotoService = require("../service/photo-service/userPhotoService")
const houseRulesService = require("../service/houseRulesService")
const { accom } = require("../models/prisma")
const executeTransaction = require("../service/transaction/executeTransaction")

const accomController = {}

accomController.verifyInfoAndFindNearbyPlaceCreate = asyncWrapper(async (req, res, next) => {
    if (!req.body.accom.address || !req.body.accom.name || !req.body.accom.description || !req.body.accom.coordinate) {
        return next(new CustomError("Please provide information about your accomodation", "InvalidInfo", 400))
    }

    if (!req.body.accom.type) {
        return next(new CustomError("Please choose your accommodation type.", "InvalidInfo", 400))
    }

    const isAddressAcquired = await accomService.findAccomByAddress(req.body.accom.address)
    if (isAddressAcquired) {
        return next(new CustomError("This address has already been registered.", "ExistsAddress", 400))
    }

    const { lat, lng } = req.body.accom.coordinate

    const existsAccom = await accomService.findAccomByLatLng(lat + "", lng + "")
    if (existsAccom) {
        return next(new CustomError("This coordinates has already been registered.", "ExistsLatLng", 400))
    }

    const nearByPlaceArr = await findPlacesService({ lat: +lat, lng: +lng })

    const nearByPlaceIDAndDistanceArr = nearByPlaceArr.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.nearbyPlaceId = curr.id
        objToPush.distance = harvesineService(+lat, +lng, curr.lat, curr.lng)
        acc.push(objToPush)
        return acc
    }, [])

    const nearByPlace = nearByPlaceArr.map((item) => {
        item.lat += ""
        item.lng += ""
        return item
    })

    req.body.accom.lat = lat + ""
    req.body.accom.lng = lng + ""
    req.body.accomInfo = {}
    req.body.accomInfo.houseRule = { ...req.body.accom.houseRule }

    delete req.body.accom.houseRule
    delete req.body.accom.coordinate

    req.body.accom.userId = req.user.id
    req.body.accomInfo.nearByPlace = nearByPlace
    req.body.accomInfo.nearByPlaceIDAndDistanceArr = nearByPlaceIDAndDistanceArr
    next()
})

accomController.verifyUserAndAccom = asyncWrapper(async (req, res, next) => {
    if (Object.keys(req.body).length < 1 && req.route.methods.patch)
        return next(new CustomError("Please provide information for edit", "InvalidInfo", 400))
    if (!req.params.accom_id || isNaN(req.params.accom_id)) return next(new CustomError("Please provide accommodation ID", "MissingInfo", 400))
    const user = await accomService.findUserIdByAccomId(+req.params.accom_id)
    if (!user || (user.userId !== req.user.id && req.user.role !== "ADMIN")) return next(new CustomError("Unauthorized", "Unauthorized", 401))
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
    // เพิ่ม key findAllRoom ลงไป เพราะ Logic เก่าผิด
    req.findAllRoom = true
    return getAccomDetailAndRoomService(req, res, next)
})

accomController.getAvailRoomByAccomId = asyncWrapper(async (req, res, next) => getAccomDetailAndRoomService(req, res, next, false))

accomController.getAccomDetailByAccomId = asyncWrapper(async (req, res, next) => {
    const isAccomExists = await accomService.findAccomByAccomId(+req.params.accom_id)
    if (!isAccomExists) return next(new CustomError("This accom ID does not exist", "NonExist", 400))

    const user = await userPhotoService.findPhotoByUserId(isAccomExists.userId)

    // Get all accom photo
    const accomPhoto = await accomPhotoService.getPhotoByAccomId(+req.params.accom_id)

    // Get user hosting duration
    const userHostDuration = await findUserHostingTime(isAccomExists.userId)

    // Get OverAll and total count of this accom ID
    const getAllReviews = await findAllReviewByAccomIdService(+req.params.accom_id)

    // Get nearby Place of this accom ID
    const allNearbyPlace = await accomNearbyService.findNearplaceByAccomId(+req.params.accom_id)
    const unSortNearbyPlace = allNearbyPlace.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.id = curr.nearbyPlace.id
        objToPush.distance = Number(curr.distance).toFixed(2)
        objToPush.name = curr.nearbyPlace.name
        objToPush.icon = curr.nearbyPlace.icon
        objToPush.coordinate = { lat: curr.nearbyPlace.lat, lng: curr.nearbyPlace.lng }
        objToPush.iconBgClr = curr.nearbyPlace.iconBgClr
        acc.push(objToPush)
        return acc
    }, [])

    const nearbyPlace = unSortNearbyPlace.sort((a, b) => a.distance - b.distance)

    // Get Featured Reviews of this Accom ID
    const featureReviews = await getFeaturedReviewByAccomIdService(isAccomExists.id)

    const houseRule = await houseRulesService.findHouseRuleByAccomId(isAccomExists.id)

    // Set data before return response
    const accom = {
        accom: isAccomExists,
        user: {
            photo: user.imagePath,
            name: user.user.fullName,
        },
        accomPhoto: accomPhoto,
        hostDuration: userHostDuration,
        reviews: getAllReviews,
        featureReviews,
        nearbyPlace,
        houseRule,
    }
    res.status(200).json(accom)
})

accomController.editAccomDetails = asyncWrapper(async (req, res, next) => {
    const response = await accomService.editAccomDetailsByAccomId(req.body, +req.params.accom_id)
    res.status(200).json(response)
})

accomController.deleteAccom = asyncWrapper(async (req, res, next) => {
    try {
        const accom = await accomService.findAccomByAccomId(+req.params.accom_id)
        if (!accom) {
            return res.status(404).send({ error: "Accommodation not found" })
        }

        await accomService.deleteAccomById(+req.params.accom_id)
        res.status(200).send({ message: "Accommodation deleted successfully" })
    } catch (error) {
        next(error)
        res.status(500).send({ error: "Server error" })
    }
})

accomController.findAvailAccomByLatLng = asyncWrapper(async (req, res, next) => {
    req.body.checkInDate = new Date(req.body.checkInDate)
    req.body.checkOutDate = new Date(req.body.checkOutDate)

    if (!req.body.lat && !req.body.lng) {
        req.body.lat = defaultCoordinate.lat
        req.body.lng = defaultCoordinate.lng
    }

    if (!req.body.distance) {
        req.body.distance = defaultDistance
    }

    if (!req.body.capacity) {
        req.body.capacity = 1
    }

    const { latMax, latMin, lngMax, lngMin } = createBoundingBox(+req.body.lat, +req.body.lng, req.body.distance)
    const allAccom = await accomService.findAccomWithInBoundingBox(latMax.toString(), latMin.toString(), lngMax.toString(), lngMin.toString())
    const allRoom = await roomService.findManyRoomWithManyAccomId(allAccom.map((item) => item.id))

    // Find Reserved room
    const roomReserved = await reservationService.findAllRoomIdByDate(req.body.checkInDate, req.body.checkOutDate)

    // Find available room ID
    const availRoomId = allRoom.filter((item) => {
        for (let ele of roomReserved) {
            if (item.id === ele.roomId) {
                return false
            }
        }
        return item
    })

    const filteredRoomId = availRoomId.filter((item) => item.capacity >= req.body.capacity)
    // Find available accom
    const roomAndAccom = await roomService.findAccomByManyRoomId(filteredRoomId.map((item) => item.id))

    const availAccom = roomAndAccom.reduce((acc, curr) => {
        if (acc.length > 0) {
            for (let ele of acc) {
                if (ele.id === curr.accomId) {
                    return acc
                }
            }
        }
        const objToPush = { ...curr.accom }
        objToPush.price = curr.price
        objToPush.distance = harvesineService(+req.body.lat, +req.body.lng, +curr.accom.lat, +curr.accom.lng)
        acc.push(objToPush)
        return acc
    }, [])

    // Adding review to accom
    for (let item of availAccom) {
        const reviews = await findAllReviewByAccomIdService(item.id)
        item.reviews = reviews
    }

    const accom = availAccom.sort((a, b) => b.reviews.overAllReview - a.reviews.overAllReview)
    res.status(200).json(accom)
})

accomController.getAllAccomByUserId = asyncWrapper(async (req, res, next) => {
    const accom = await accomService.findAllAccomByUserId(+req.params.user_id)
    if (accom.length < 1) return res.status(200).json({ accom: [], hostTime: 0, rating: { overAllReview: 0, count: 0 } })
    const hostTime = await findUserHostingTime(+req.params.user_id)
    const review = []
    for (let item of accom) {
        review.push(...(await getFeaturedReviewByAccomIdService(item.id)))
    }
    const rating = review.reduce(
        (acc, curr) => {
            acc.overAllReview += curr.overAllReview
            return acc
        },
        { overAllReview: 0 },
    )
    rating.overAllReview = (rating.overAllReview / review.length).toFixed(1)
    rating.count = review.length
    res.status(200).json({ accom, rating, hostTime })
})

// เพิ่มดึงข้อมูล accom ทั้งหมด
accomController.getAllAccoms = async (req, res, next) => {
    try {
        const { page = 1, sortKey = "createdAt", sortOrder = "desc", searchTerm = "" } = req.query

        const parsedPage = parseInt(page, 10)

        const { accoms, totalPages, currentPage } = await accomService.findAllAccoms(parsedPage, sortKey, sortOrder, searchTerm)

        res.status(200).json({ accoms, totalPages, currentPage })
    } catch (error) {
        next(error)
    }
}

accomController.updateAccomStatus = async (req, res, next) => {
    try {
        const { accomId, status } = req.body
        const updatedAccom = await accomService.updateAccomStatus(accomId, status)
        res.status(200).json(updatedAccom)
    } catch (error) {
        next(error)
    }
}
accomController.transactionForCreateRoomAndAccom = asyncWrapper(async (req, res, next) => {
    const { beds, amenities } = req.body.room
    delete req.body.room.beds
    delete req.body.room.amenities
    beds.amount = Number(beds.amount)
    req.body.room.price = Number(req.body.room.price)
    req.body.room.bathRoom = Number(req.body.room.bathRoom)
    req.body.room.bedRoom = Number(req.body.room.bedRoom)
    req.body.room.size = Number(req.body.room.size)
    const response = await executeTransaction(req.body.accom, req.body.accomInfo, req.body.room, beds, amenities)
    console.log(response)
    res.status(201).json(response)
})

module.exports = accomController
