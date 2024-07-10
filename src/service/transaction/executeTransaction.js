const { response } = require("express")
const prisma = require("../../models/prisma")
const asyncWrapper = require("../../utils/asyncWrapper")
const nearbyPlaceService = require("../nearbyPlaceService")
const { createAccomService, verifyRoomBeforeCreate, verifyAccomBeforeCreate, createRoomService } = require("./transactionFn")
const { CustomError } = require("../../config/error")

const executeTransaction = async (req, res, next) => {
    try {
        await prisma.$transaction(async (transaction) => {
            // Verify part
            const accomInfo = await verifyAccomBeforeCreate(req, res, next, transaction)
            const { room, beds, amenities } = await verifyRoomBeforeCreate(req, res, next, transaction)

            // Create Accom
            const accom = await createAccomService(req, res, next, transaction, accomInfo)
            // Pass Created Accom ID to room
            if (!accom) {
                return next(new CustomError("Create Accommodation unsuccesful.", "InComplete", 400))
            }
            room.accomId = accom.id

            // Create room, bed and amenities
            const roomResult = await createRoomService(req, res, next, transaction, room, beds, amenities)
            if (!roomResult) {
                return next(new CustomError("Create Room unsuccesful.", "InComplete", 400))
            }
            res.status(201).json({ accom, roomResult })
        })
    } catch (err) {
        next(err)
    }
}

module.exports = executeTransaction
