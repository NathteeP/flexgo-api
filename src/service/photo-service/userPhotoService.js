const prisma = require("../../models/prisma")
const userPhotoService = {}

userPhotoService.uploadPhoto = (data) => prisma.userPhoto.create({ data })

userPhotoService.editPhoto = (image, id) =>
    prisma.userPhoto.update({
        data: {
            imagePath: image,
        },
        where: {
            id,
        },
    })

userPhotoService.findPhotoByUserId = (userId) =>
    prisma.userPhoto.findFirst({
        where: {
            userId,
        },
    })

userPhotoService.deleteUserPhoto = (id) =>
    prisma.userPhoto.delete({
        where: {
            id,
        },
    })

module.exports = userPhotoService
