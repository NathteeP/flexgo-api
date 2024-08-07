const prisma = require("../models/prisma")
const accomNearbyService = {}

accomNearbyService.createMany = (data) => prisma.accomNearbyPlaces.createMany({ data })

accomNearbyService.findNearplaceByAccomId = (accomId) =>
    prisma.accomNearbyPlaces.findMany({
        where: {
            accomId,
        },
        include: {
            nearbyPlace: true,
        },
    })

module.exports = accomNearbyService
