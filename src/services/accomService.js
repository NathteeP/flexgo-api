const prisma = require("../models/prisma")
const accomNearbyService = require("./accomNearbyService")

const accomService = {}

accomService.findUserIdByAccomId = (id) =>
    prisma.accommodation.findUnique({
        where: {
            id,
        },
        select: {
            userId: true,
        },
    })

accomService.findAccomByAccomId = (id) =>
    prisma.accommodation.findUnique({
        where: { id },
    })

accomService.createAccomTx = (accom, nearByPlaceId) =>
    prisma.$transaction(async (tx) => {
        const response = await accomService.createAccom({
            ...accom,
        })
        const accomNearby = nearByPlaceId.map((item) => {
            item.accommodationId = response.id
            return item
        })
        const result = await accomNearbyService.createMany(accomNearby)
        return { result, response }
    })

accomService.createAccom = (data) => prisma.accommodation.create({ data })

accomService.findAccomByLatLng = (lat, lng) =>
    prisma.accommodation.findFirst({
        where: {
            lat: lat,
            lng: lng,
        },
    })

accomService.findAccomByAddress = (address) =>
    prisma.accommodation.findFirst({
        where: { address },
    })

module.exports = accomService
