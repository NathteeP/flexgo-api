const prisma = require("../models/prisma")
const reservationService = {}

reservationService.findAllReserveByRoomId = (roomId) =>
    prisma.reservation.findMany({
        where: {
            roomId: {
                in: roomId,
            },
        },
    })

reservationService.findAllRoomIdByDate = (date) =>
    prisma.reservation.findMany({
        where: {
            checkInDate: {
                lte: date,
            },
            checkOutDate: {
                gte: date,
            },
        },
    })

reservationService.findReservedRoomIdByDateAndRoomId = (date, roomId) =>
    prisma.reservation.findMany({
        where: {
            checkInDate: {
                lte: date,
            },
            checkOutDate: {
                gte: date,
            },
            roomId: {
                in: roomId,
            },
        },
    })

module.exports = reservationService
