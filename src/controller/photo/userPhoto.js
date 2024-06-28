const { CustomError } = require("../../config/error")
const userPhotoService = require("../../service/photo-service/userPhotoService")
const { cloudinaryUpload } = require("../../utils/cloudinaryUpload")
const fs = require("fs/promises")
const cloudinary = require("../../config/cloudinary")
const asyncWrapper = require("../../utils/asyncWrapper")

const userPhotoController = {}

// ## Verify user before making change to thier photo
userPhotoController.verify = asyncWrapper(async (req, res, next) => {
    const hasUploadedBefore = await userPhotoService.findPhotoByUserId(req.user.id)
    if (!hasUploadedBefore)
        return next(
            new CustomError(`The user ID ${req.user.id} has never uploaded photo before. Consider upload your first photo first`, "MissingData", 400),
        )
    const imagePath = hasUploadedBefore.imagePath.split("/").pop().split(".")[0]
    req.image = {
        imagePath,
        id: hasUploadedBefore.id,
    }
    next()
})

// ## Uploading photo for the first time
userPhotoController.uploadPhoto = async (req, res, next) => {
    try {
        if (!req.file || req.file.length < 1) return next(new CustomError("No information sent", "MissingInfo", 400))
        const hasUploadedBefore = await userPhotoService.findPhotoByUserId(req.user.id)

        if (hasUploadedBefore) {
            const imagePath = hasUploadedBefore.imagePath.split("/").pop().split(".")[0]
            const deletedResponse = await cloudinary.uploader.destroy(`Users/${imagePath}`)
            if (deletedResponse.result === "not found") {
                return next(new CustomError("There is an error edit the old file", "UploadError", 400))
            }
            const { secure_url } = await cloudinary.uploader.upload(req.file.path, { resource_type: "image", folder: "Users" })
            await userPhotoService.editPhoto(secure_url, hasUploadedBefore.id)
            return res.status(200).json({ message: `Replaced the old photo with new photo successfully!` })
        }

        const { secure_url } = await cloudinary.uploader.upload(req.file.path, { resource_type: "image", folder: "Users" })
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

// userPhotoController.getUserPhoto = async(req,res,next) => {
//   const user =
// }

// ## Edit userPhoto by delete old and patch the new one
userPhotoController.editUserPhoto = async (req, res, next) => {
    try {
        if (!req.file || req.file.length < 1) return next(new CustomError("No information sent", "MissingInfo", 400))
        const deletedResponse = await cloudinary.uploader.destroy(`Users/${req.image.imagePath}`)
        if (deletedResponse.result === "not found") {
            return next(new CustomError("There is an error edit the old file", "UploadError", 400))
        }
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, { resource_type: "image", folder: "Users" })
        await userPhotoService.editPhoto(secure_url, req.image.id)
        res.status(200).json({ message: `Photo edited successful!` })
    } catch (err) {
        next(err)
    } finally {
        fs.unlink(req.file.path)
    }
}

userPhotoController.deleteUserPhoto = async (req, res, next) => {
    try {
        const deletedResponse = await cloudinary.uploader.destroy(`Users/${req.image.imagePath}`)
        if (deletedResponse.result === "not found")
            return next(
                new CustomError("There is an error deleting photo on the cloudinary. Maybe wrong image path. Please check again", "UploadError", 400),
            )
        await userPhotoService.deleteUserPhoto(req.image.id)
        res.status(204).json({ message: "deleted successul" })
    } catch (err) {
        next(err)
    }
}
module.exports = userPhotoController
