const prisma = require("../../models/prisma")
const roomAndBedService = {}

roomAndBedService.createMany = (data) =>
    prisma.roomBed.createMany({
        data,
    })

roomAndBedService.findAllBedByRoomId = (roomId) =>
    prisma.roomBed.findMany({
        where: {
            roomId: {
                in: roomId,
            },
        },
        include: {
            bedType: true,
        },
    })

module.exports = roomAndBedService
