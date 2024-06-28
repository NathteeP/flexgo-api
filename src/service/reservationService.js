const prisma = require("../models/prisma")

const reservationService = {}

reservationService.create = data => prisma.reservation.create({data})


reservationService.checkIfDuplicate = (userId, checkInDate) => 
    prisma.reservation.findFirst({where:{userId,checkInDate}})


module.exports = reservationService