const { CustomError } = require("../../config/error")
const roomService = require("../../service/room-and-bed/roomService")
const asyncWrapper = require("../../utils/asyncWrapper")
const fs = require("fs/promises")
const cloudinary = require("../../config/cloudinary")
const roomPhotoService = require("../../service/photo-service/roomPhotoService")

const roomPhotoController = {}

roomPhotoController.verifyUserAndRoom = asyncWrapper(async (req, res, next) => {
    const room = await roomService.getUserIdByRoomId(+req.params.room_id)
    if (!room) return next(new CustomError("Can not find the room with this room ID.", "InvalidInfo", 400))
    const user = room.accom.userId
    if (user !== req.user.id) return next(new CustomError("Invalid Credentials", "Unauthorized", 401))
    next()
})

roomPhotoController.uploadRoomPhoto = async (req, res, next) => {
    try {
        if (!req.files || req.files.length < 1) return next(new CustomError("Missing information", "MissInfo", 400))
        const uploadPromise = req.files.reduce((acc, curr) => {
            const response = cloudinary.uploader.upload(curr.path, { resource_type: "image", folder: "Room" })
            acc.push(response)
            return acc
        }, [])
        const uploadedPhotoArr = await Promise.allSettled(uploadPromise)
        const data = uploadedPhotoArr.reduce((acc, curr) => {
            const objToPush = {}
            objToPush.roomId = +req.params.room_id
            objToPush.imagePath = curr.value.secure_url
            acc.push(objToPush)
            return acc
        }, [])
        const response = await roomPhotoService.createManyPhoto(data)
        res.status(201).json({ message: `Room ID : ${+req.params.room_id} has uploaded ${response.count} photo successfuly.`, response })
    } catch (err) {
        next(err)
    } finally {
        for (let item of req.files) {
            fs.unlink(item.path)
        }
    }
}

module.exports = roomPhotoController
