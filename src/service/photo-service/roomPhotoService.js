const prisma = require("../../models/prisma")
const roomPhotoService = {}

roomPhotoService.createManyPhoto = (data) =>
    prisma.roomPhoto.createMany({
        data,
    })

module.exports = roomPhotoService
