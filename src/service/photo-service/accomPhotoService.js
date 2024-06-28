const prisma = require("../../models/prisma")
const accomPhotoService = {}

accomPhotoService.uploadPhoto = (data) =>
    prisma.accomPhoto.createMany({
        data,
    })

module.exports = accomPhotoService
