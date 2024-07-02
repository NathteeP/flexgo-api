const prisma = require("../../models/prisma")
const amenityTypeService = {}

amenityTypeService.findAminityTypeById = (id) =>
    prisma.amenityType.findMany({
        where: {
            id: {
                in: id,
            },
        },
    })

amenityTypeService.findAllAmenityType = () => prisma.amenityType.findMany()

module.exports = amenityTypeService
