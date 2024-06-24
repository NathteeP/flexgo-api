const prisma = require("../models/prisma")

const accomService = {}

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
