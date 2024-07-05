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

reservationService.findAllRoomIdByDate = (checkIndate, checkOutDate) =>
    prisma.reservation.findMany({
        where: {
            checkInDate: {
                lte: checkIndate,
            },
            checkOutDate: {
                gt: checkOutDate,
            },
        },
    })

reservationService.findReservedRoomIdByDateAndRoomId = (checkInDate, checkOutDate, roomId) =>
    prisma.reservation.findMany({
        where: {
            roomId: {
                in: roomId,
            },
            checkInDate: {
                lte: checkInDate,
            },
            checkOutDate: {
                gt: checkOutDate,
            },
        },
        // having: {
        //     checkInDate: {
        //         lte: checkInDate,
        //     },
        //     checkOutDate: {
        //         gt: checkOutDate,
        //     },
        // },
    })

reservationService.generateId = async () => {
    const curDate = new Date()
    const year = curDate.getFullYear().toString().slice(-2)
    const month = (curDate.getMonth() + 1).toString().padStart(2, "0")
    const day = curDate.getDate().toString().padStart(2, "0")

    const curDateStr = year + month + day

    let counter

    try {
        const dateCounter = await prisma.dateCounter.upsert({
            where: { date: curDateStr },
            update: { counter: { increment: 1 } },
            create: { date: curDateStr, counter: 1 },
        })
        counter = dateCounter.counter

        // generate Id = ปี เดือน วัน (6หลัก) + เลขนับจำนวนใน database (4หลัก) + เลข random 1-99 (2หลัก)
        const generatedId =
            curDateStr +
            counter.toString().padStart(4, "0") +
            Math.floor(Math.random() * 100)
                .toString()
                .padStart(2, "0")
        return generatedId
    } catch (err) {
        throw new CustomError("Error generating Id", "GeneratingError", 400)
    }
}

reservationService.checkIfDuplicate = (userId, checkInDate) => prisma.reservation.findFirst({ where: { userId, checkInDate } })

reservationService.create = (data) => prisma.reservation.create({ data })

reservationService.findReservationById = (reservationId) => prisma.reservation.findUnique({ where: { id: reservationId } })

reservationService.updateReservationById = (reservationId, data) => prisma.reservation.update({ where: { id: reservationId }, data })

reservationService.deleteReservationById = (reservationId) => prisma.reservation.delete({ where: { id: reservationId } })

reservationService.findAllReservationByUserId = (userId) => prisma.reservation.findMany({ where: { userId } })

reservationService.findTodayReservedRoomByRoomId = (roomId) =>
    prisma.reservation.findMany({
        where: {
            roomId: {
                in: roomId,
            },
            checkInDate: {
                lte: new Date(Date.now()),
            },
            checkOutDate: {
                gte: new Date(Date.now()),
            },
        },
    })

module.exports = reservationService
