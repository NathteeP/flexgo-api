const prisma = require("../../models/prisma")
const roomAmenitiesService = {}

roomAmenitiesService.createAmenitiesForRoom = (data) => prisma.amenities.createMany({ data, skipDuplicates: true })

roomAmenitiesService.deleteAmenitiesForRoom = (id) =>
    prisma.amenities.deleteMany({
        where: {
            id: {
                in: id,
            },
        },
    })

module.exports = roomAmenitiesService
