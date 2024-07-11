const { response } = require("express")
const prisma = require("../../models/prisma")
const asyncWrapper = require("../../utils/asyncWrapper")
const nearbyPlaceService = require("../nearbyPlaceService")
const { createAccomService, verifyRoomBeforeCreate, verifyAccomBeforeCreate, createRoomService } = require("./transactionFn")
const { CustomError } = require("../../config/error")

const executeTransaction = async (accomInfo, otherInfo, roomInfo, beds, amenities) => {
    try {
        await prisma.$transaction(async (transaction) => {
            // Create Accom
            const accom = await createAccomService(transaction, accomInfo, otherInfo)
            // Pass Created Accom ID to room
            roomInfo.accomId = accom.id

            // Create room, bed and amenities
            const roomResult = await createRoomService(transaction, roomInfo, beds, amenities)
            return { accom, roomResult }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = executeTransaction
