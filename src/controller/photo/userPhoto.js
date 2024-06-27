const { CustomError } = require("../../config/error")
const userPhotoService = require("../../service/photo-service/userPhotoService")
const { cloudinaryUpload } = require("../../utils/cloudinaryUpload")
const fs = require("fs/promises")
const cloudinary = require("../../config/cloudinary")

const userPhotoController = {}

userPhotoController.uploadPhoto = async (req, res, next) => {
    try {
        if (!req.file || req.file.length < 1) return next(new CustomError("No data sent", "NoData", 400))
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        if (!secure_url) return next(new CustomError("Error", "Error", 500))
        const data = {
            userId: req.user.id,
            imagePath: secure_url,
        }
        const response = await userPhotoService.uploadPhoto(data)
        res.status(201).json({ message: `Photo ID ${response.id} has uploaded to UserID ${req.user.id} successfully!`, response: secure_url })
    } catch (err) {
        next(err)
    } finally {
        fs.unlink(req.file.path)
    }
}

module.exports = userPhotoController
