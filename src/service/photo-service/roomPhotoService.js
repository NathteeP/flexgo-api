const prisma = require("../../models/prisma")
const roomPhotoService = {}

roomPhotoService.createManyPhoto = (data) =>
    prisma.roomPhoto.createMany({
        data,
    })

roomPhotoService.findRoomPhotoById = (id) =>
    prisma.roomPhoto.findUnique({
        where: {
            id,
        },
    })

roomPhotoService.update = (data, id) =>
    prisma.roomPhoto.update({
        data,
        where: {
            id,
        },
    })

roomPhotoService.findManyPhoto = (id) =>
    prisma.roomPhoto.findMany({
        where: {
            id: {
                in: id,
            },
        },
    })

roomPhotoService.deleteOnePhotoById = (id) =>
    prisma.roomPhoto.delete({
        where: {
            id,
        },
    })

roomPhotoService.findManyPhotoByManyRoomId = (roomId) =>
    prisma.roomPhoto.findMany({
        where: {
            roomId: {
                in: roomId,
            },
        },
    })
module.exports = roomPhotoService
