const prisma = require("../../models/prisma")
const accomPhotoService = {}

accomPhotoService.uploadPhoto = (data) =>
    prisma.accomPhoto.createMany({
        data,
    })

accomPhotoService.getPhotoByAccomId = (accomId) =>
    prisma.accomPhoto.findMany({
        where: {
            accomId,
        },
    })

accomPhotoService.findAccomPhotoById = (id) =>
    prisma.accomPhoto.findUnique({
        where: {
            id,
        },
    })

accomPhotoService.updateAccomPhotoById = (data, id) =>
    prisma.accomPhoto.update({
        where: {
            id,
        },
        data,
    })

accomPhotoService.deleteOneAccomPhotoById = (id) =>
    prisma.accomPhoto.delete({
        where: {
            id,
        },
    })

accomPhotoService.findManyAccomPhotoByManyAccomId = (accomId) =>
    prisma.accomPhoto.findMany({
        where: {
            accomId: {
                in: accomId,
            },
        },
    })

module.exports = accomPhotoService
