const prisma = require("../../models/prisma")
const bedTypeService = {}

bedTypeService.findManyBedTypeIdByBedType = (bedType) =>
    prisma.bedType.findMany({
        where: {
            name: {
                in: bedType,
            },
        },
    })

bedTypeService.findBedTypeByBedTypeName = (bedType) =>
    prisma.bedType.findFirst({
        where: {
            name: bedType,
        },
    })

module.exports = bedTypeService
