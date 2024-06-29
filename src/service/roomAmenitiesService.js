const prisma = require("../models/prisma")
const roomAmenitiesService = {}

roomAmenitiesService.createAmenitiesForRoom = (data) => prisma.amenities.createMany({ data })

module.exports = roomAmenitiesService
