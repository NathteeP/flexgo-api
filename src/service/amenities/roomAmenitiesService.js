const prisma = require("../../models/prisma")
const roomAmenitiesService = {}

roomAmenitiesService.createAmenitiesForRoom = (data) => prisma.amenities.createMany({ data, skipDuplicates: true })

module.exports = roomAmenitiesService
