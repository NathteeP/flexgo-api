const { CustomError } = require("../../config/error")
const roomService = require("../../service/room-and-bed/roomService")
const asyncWrapper = require("../../utils/asyncWrapper")
const fs = require("fs/promises")
const cloudinary = require("../../config/cloudinary")
const roomPhotoService = require("../../service/photo-service/roomPhotoService")
const { cloudinaryFolder } = require("../../constant/cloundinaryFolder")

const roomPhotoController = {}

roomPhotoController.verifyUserAndRoom = asyncWrapper(async (req, res, next) => {
    const room = await roomService.getUserIdByRoomId(+req.params.room_id)
    if (!room) return next(new CustomError(`The room ID ${+req.params.room_id} does not exist.`, "NonExist", 400))
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

roomPhotoController.editRoomPhoto = async (req, res, next) => {
    try {
        if (!req.file || req.file.length < 1) return next(new CustomError("Can not find any files sent.", "MissingData", 400))
        // Check image for edit
        if (!req.body.image_id || typeof req.body.image_id !== "string")
            return next(new CustomError("Please provide room ID to edit", "MissingInfo", 400))

        // Find Image path
        const photo = await roomPhotoService.findRoomPhotoById(+req.body.image_id)

        // Check if params ID match with request ID
        if (photo.roomId !== +req.params.room_id) return next(new CustomError("Wrong room ID", "Invalid Info", 401))

        // Set image Path before remove
        const path = photo.imagePath.split("/").pop().split(".")[0]
        const deletedResponse = await cloudinary.api.delete_resources(`${cloudinaryFolder.Room}/${path}`)
        if (deletedResponse.result === "not found") return next(new CustomError("There is an error edit the old file", "UploadError", 400))

        const { secure_url } = await cloudinary.uploader.upload(req.file.path, { resource_type: "image", folder: cloudinaryFolder.Room })
        await roomPhotoService.update({ imagePath: secure_url }, photo.id)
        res.status(200).json({ message: `The Room ID ${req.params.room_id} has updated photo successful!` })
    } catch (err) {
        next(err)
    } finally {
        fs.unlink(req.file.path)
    }
}

module.exports = roomPhotoController
