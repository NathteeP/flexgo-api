const prisma = require("../models/prisma")
const nearbyPlaceService = {}

nearbyPlaceService.createMany = (data) => prisma.nearbyPlace.createMany({ data, skipDuplicates: true })

nearbyPlaceService.findPlaceIdByPlaceId = (id) =>
    prisma.nearbyPlace.findMany({
        where: {
            id: {
                in: id,
            },
        },
    })

module.exports = nearbyPlaceService
