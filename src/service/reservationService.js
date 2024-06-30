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

module.exports = reservationService
