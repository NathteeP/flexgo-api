const prisma = require("../../models/prisma")
const roomAmenitiesService = {}

roomAmenitiesService.createAmenitiesForRoom = (data) => prisma.amenities.createMany({ data, skipDuplicates: true })

roomAmenitiesService.getAllRoomAmenitiesByRoomId = (id) =>
    prisma.amenities.findMany({
        where: {
            roomId: id,
        },
    })

roomAmenitiesService.deleteAmenitiesForRoom = (id) =>
    prisma.amenities.deleteMany({
        where: {
            id: {
                in: id,
            },
        },
    })

roomAmenitiesService.findManyAmenitiesByManyRoomId = (roomId) =>
    prisma.amenities.findMany({
        where: {
            roomId: {
                in: roomId,
            },
        },
    })

module.exports = roomAmenitiesService
