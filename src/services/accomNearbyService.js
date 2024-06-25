const prisma = require("../models/prisma")
const accomNearbyService = {}

accomNearbyService.createMany = (data) => prisma.accomNearbyPlaces.createMany({ data })

module.exports = accomNearbyService
