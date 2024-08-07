const { response } = require("express")
const prisma = require("../../models/prisma")
const asyncWrapper = require("../../utils/asyncWrapper")
const nearbyPlaceService = require("../nearbyPlaceService")
const { createAccomService, verifyRoomBeforeCreate, verifyAccomBeforeCreate, createRoomService } = require("./transactionFn")
const { CustomError } = require("../../config/error")

const executeTransaction = async (accomInfo, otherInfo, roomInfo, beds, amenities) => {
    try {
        const result = await prisma.$transaction(async (transaction) => {
            // Create Accom
            const accom = await createAccomService(transaction, accomInfo, otherInfo)
            // Pass Created Accom ID to room
            roomInfo.accomId = accom.id

            // Create room, bed and amenities
            const roomResult = await createRoomService(transaction, roomInfo, beds, amenities)
            console.log("finish create everything. Congrat!")
            return { accom, roomResult }
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

const executeTransactionForRoomAndPhoto = async (roomInfo, beds, amenities, image) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const room = await createRoomService(tx, roomInfo, beds, amenities)
            await tx.roomPhoto.create({ data: { imagePath: image, roomId: room.id } })
            console.log(`room and photo has been created successfully!`)
            return room
        })
        return result
    } catch (err) {
        console.log(err)
    }
}
module.exports = { executeTransaction, executeTransactionForRoomAndPhoto }
