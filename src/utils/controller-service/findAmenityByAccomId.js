const roomService = require("../../service/room-and-bed/roomService")
const prisma = require("../../models/prisma")
const findAmenityByAccomId = async (accomId) => {
    const room = await prisma.room.findFirst({
        where: {
            accomId,
        },
    })
    if (!room) {
        return null
    }
    const amenity = await prisma.amenities.findMany({
        where: {
            roomId: room.id,
        },
    })
    if (!amenity) {
        return null
    }
    const amenities = amenity.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.id = curr.amenityTypeId
        acc.push(objToPush)
        return acc
    }, [])
    return amenities
}

module.exports = { findAmenityByAccomId }
