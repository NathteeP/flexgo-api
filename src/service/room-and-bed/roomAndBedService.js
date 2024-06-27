const prisma = require("../../models/prisma")
const roomAndBedService = {}

roomAndBedService.createMany = (data) =>
    prisma.roomBed.createMany({
        data,
    })

module.exports = roomAndBedService
