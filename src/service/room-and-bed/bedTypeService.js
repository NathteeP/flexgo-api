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

module.exports = bedTypeService
