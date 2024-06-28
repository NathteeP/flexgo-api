const prisma = require("../../models/prisma")
const roomPhotoService = {}

roomPhotoService.createManyPhoto = (data) =>
    prisma.roomPhoto.createMany({
        data,
    })

roomPhotoService.updateMany = (data, id) =>
    prisma.roomPhoto.updateMany({
        data,
        where: {
            id,
        },
    })
module.exports = roomPhotoService
