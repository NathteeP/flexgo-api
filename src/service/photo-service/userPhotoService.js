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
        include: {
            user: {
                select: {
                    fullName: true,
                },
            },
        },
    })

userPhotoService.deleteUserPhoto = (id) =>
    prisma.userPhoto.delete({
        where: {
            id,
        },
    })

userPhotoService.updateOrCreatePhoto = async (userId, imagePath) => {
    const existingPhoto = await prisma.userPhoto.findFirst({ where: { userId } })

    if (existingPhoto) {
        return userPhotoService.editPhoto(imagePath, existingPhoto.id)
    } else {
        return userPhotoService.uploadPhoto({ userId, imagePath })
    }
}

module.exports = userPhotoService
