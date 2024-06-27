const prisma = require("../../models/prisma")
const roomAndBedService = require("./roomAndBedService")
const roomService = {}

roomService.transactionForCreateRoomAndBed = (roomData, bed) =>
    prisma.$transaction(async (tx) => {
        const room = await roomService.create(roomData)
        const bedType = bed.map((item) => {
            item.roomId = room.id
            return item
        })
        const bedOfRoom = await roomAndBedService.createMany(bedType)
        return { room, bedOfRoom }
    })

roomService.create = (data) =>
    prisma.room.create({
        data,
    })

module.exports = roomService
