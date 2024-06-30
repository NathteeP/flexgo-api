const prisma = require("../../models/prisma")
const accomPhotoService = {}

accomPhotoService.uploadPhoto = (data) =>
    prisma.accomPhoto.createMany({
        data,
    })

accomPhotoService.getPhotoByAccomId = (id) =>
    prisma.accomPhoto.findMany({
        where: {
            id,
        },
    })

module.exports = accomPhotoService
