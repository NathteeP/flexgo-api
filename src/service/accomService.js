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
        const response = await accomService.createAccom({
            ...accom,
        })
        const accomNearby = nearByPlaceId.map((item) => {
            item.accomId = response.id
            return item
        })
        const result = await accomNearbyService.createMany(accomNearby)
        return { result, response }
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

module.exports = accomService
