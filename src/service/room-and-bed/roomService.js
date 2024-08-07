const prisma = require("../../models/prisma")
const roomAndBedService = require("./roomAndBedService")
const roomService = {}

roomService.transactionForCreateRoomAndBed = (roomData, bed) =>
    prisma.$transaction(async (tx) => {
        try {
            const room = await roomService.create(roomData)
            const bedType = bed.map((item) => {
                item.roomId = room.id
                return item
            })
            const bedOfRoom = await roomAndBedService.createMany(bedType)
            return { room, bedOfRoom }
        } catch (err) {
            next(err)
        }
    })

roomService.create = (data) =>
    prisma.room.create({
        data,
    })

roomService.getRoomAndBedByRooomId = (id) =>
    prisma.room.findUnique({
        where: {
            id,
            status: "ACTIVE",
        },
        include: {
            roomBed: {
                include: {
                    bedType: true,
                },
            },
        },
    })

roomService.getUserIdByRoomId = (id) =>
    prisma.room.findUnique({
        where: {
            id,
        },
        include: {
            accom: true,
        },
    })

roomService.findAllRoomByAccomId = (accomId) =>
    prisma.room.findMany({
        where: {
            accomId,
            status: "ACTIVE",
        },
    })

roomService.editRoomDetailsByRoomId = (data, id) =>
    prisma.room.update({
        data,
        where: {
            id,
        },
    })

roomService.changeRoomStatusToInAcvie = (id) =>
    prisma.room.update({
        where: {
            id,
        },
        data: {
            status: "INACTIVE",
        },
    })

roomService.findManyRoomWithManyAccomId = (accomId) =>
    prisma.room.findMany({
        where: {
            accomId: {
                in: accomId,
            },
        },
    })

roomService.findAccomByManyRoomId = (id) =>
    prisma.room.findMany({
        where: {
            id: {
                in: id,
            },
        },
        include: {
            accom: {
                include: {
                    accomPhoto: true,
                },
            },
        },
        orderBy: {
            price: "asc",
        },
    })

roomService.findMinPriceByManyAccomId = (accomId) =>
    prisma.room.groupBy({
        by: ["accomId"],
        where: {
            accomId: {
                in: accomId,
            },
        },
        _min: {
            price: true,
        },
    })

module.exports = roomService
