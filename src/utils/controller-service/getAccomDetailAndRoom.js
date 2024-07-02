const { CustomError } = require("../../config/error")
const { getAccomDetailByAccomId } = require("../../controller/accom")
const accomService = require("../../service/accomService")
const amenityTypeService = require("../../service/amenities/amenityTypeService")
const roomAmenitiesService = require("../../service/amenities/roomAmenitiesService")
const roomPhotoService = require("../../service/photo-service/roomPhotoService")
const reservationService = require("../../service/reservationService")
const roomAndBedService = require("../../service/room-and-bed/roomAndBedService")
const roomService = require("../../service/room-and-bed/roomService")
const asyncWrapper = require("../asyncWrapper")

const getAccomDetailAndRoomService = asyncWrapper(async (req, res, next, findAllRoom) => {
    if (isNaN(req.params.accom_id)) return next(new CustomError("Please provide accommodation ID", "InvalidInfo", 400))
    const isAccomExists = await accomService.findAccomByAccomId(+req.params.accom_id)
    if (!isAccomExists) return next(new CustomError("This accom does not exist", "NonExist", 400))

    let allRoom = await roomService.findAllRoomByAccomId(+req.params.accom_id)
    if (allRoom.length < 1) return res.status(200).json(allRoom)

    if (!findAllRoom) {
        if (!req.body.date) {
            req.body.date = new Date(Date.now())
        }

        const roomReserved = await reservationService.findReservedRoomIdByDateAndRoomId(
            req.body.date,
            allRoom.map((item) => item.id),
        )

        const availRoom = allRoom.filter((item) => {
            for (let ele of roomReserved) {
                if (item.id === ele.roomId) {
                    return false
                }
            }
            return item
        })
        allRoom = availRoom
    }
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

module.exports = getAccomDetailAndRoomService
