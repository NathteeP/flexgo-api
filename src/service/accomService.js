const prisma = require("../models/prisma")
const accomNearbyService = require("./accomNearbyService")

const accomService = {}

accomService.findUserIdByAccomId = (id) =>
    prisma.accom.findUnique({
        where: {
            id,
        },
        select: {
            userId: true,
        },
    })

accomService.findAccomByAccomId = (id) =>
    prisma.accom.findUnique({
        where: { id },
    })

accomService.createAccomTx = (accom, nearByPlaceId) =>
    prisma.$transaction(async (tx) => {
        try {
            const response = await accomService.createAccom({
                ...accom,
            })
            const accomNearby = nearByPlaceId.map((item) => {
                item.accomId = response.id
                return item
            })
            const result = await accomNearbyService.createMany(accomNearby)
            return { result, response }
        } catch (err) {
            next(err)
        }
    })

accomService.createAccom = (data) =>
    prisma.accom.create({
        data,
    })

accomService.findAccomByLatLng = (lat, lng) =>
    prisma.accom.findFirst({
        where: {
            lat: lat,
            lng: lng,
        },
    })

accomService.findAccomByAddress = (address) =>
    prisma.accom.findFirst({
        where: { address },
    })

accomService.findAllAccomByUserId = (userId) =>
    prisma.accom.findMany({
        where: {
            userId,
        },
    })

accomService.findStartedYearOfUser = (userId) =>
    prisma.accom.findFirst({
        where: {
            userId,
        },
        select: {
            createdAt: true,
        },
    })

module.exports = accomService
