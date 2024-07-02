const { CustomError } = require("../../config/error")
const asyncWrapper = require("../../utils/asyncWrapper")
const cloudinary = require("../../config/cloudinary")
const accomPhotoService = require("../../service/photo-service/accomPhotoService")
const fs = require("fs/promises")
const accomService = require("../../service/accomService")
const { cloudinaryFolder } = require("../../constant/cloundinaryFolder")
const roomPhotoService = require("../../service/photo-service/roomPhotoService")

// Create controller object
const accomPhotoController = {}

accomPhotoController.validateUser = asyncWrapper(async (req, res, next) => {
    if (isNaN(+req.params.accom_id)) return next(new CustomError("Invalid accom ID", "InvalidInfo", 400))
    const user = await accomService.findUserIdByAccomId(+req.params.accom_id)
    if (!user || user.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unauthorized", 401))
    next()
})

accomPhotoController.uploadPhoto = async (req, res, next) => {
    try {
        if (!req.files) return next(new CustomError("No data sent", "NoData", 400))
        const result = req.files.reduce((acc, curr) => {
            const response = cloudinary.uploader.upload(curr.path, { resource_type: "raw", folder: "Accom" })
            acc.push(response)
            return acc
        }, [])
        const uploadedPhotoArr = await Promise.allSettled(result)
        const data = uploadedPhotoArr.reduce((acc, curr) => {
            const objToPush = {}
            objToPush.accomId = +req.params.accomId
            objToPush.imagePath = curr.value.secure_url
            acc.push(objToPush)
            return acc
        }, [])
        const response = await accomPhotoService.uploadPhoto(data)
        res.status(201).json(response)
    } catch (err) {
        next(err)
    } finally {
        for (let image of req.files) {
            fs.unlink(image.path)
        }
    }
}

// Can Edit only one photo per request
accomPhotoController.editPhoto = async (req, res, next) => {
    try {
        if (!req.file || req.file.length < 1) return next(new CustomError("No data sent", "NoData", 400))

        if (!req.body.image_id || typeof +req.body.image_id !== "number")
            return next(new CustomError("Please provide photo ID to edit", "MissingInfo", 400))

        const photo = await accomPhotoService.findAccomPhotoById(+req.body.image_id)
        if (!photo) return next(new CustomError("This photo ID did not exist", "NonExist", 400))

        // Check if accomID with this photoID match with request accomID
        if (photo.accomId !== +req.params.accom_id) return next(new CustomError("Photo ID and Accom ID mismatched", "Mismatch", 400))

        const path = photo.imagePath.split("/").pop().split(".")[0]

        // Delete the old photo in cloudinary
        const deletedResponse = await cloudinary.uploader.destroy(`${cloudinaryFolder.Accom}/${path}`)
        if (deletedResponse.result === "not found") return next(new CustomError("There is an error edit the old file", "UploadError", 400))

        // Upload photo to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, { resource_type: "image", folder: cloudinaryFolder.Accom })

        // Update database
        await accomPhotoService.updateAccomPhotoById({ imagePath: secure_url }, photo.id)

        // Sent response back
        res.status(200).json({ message: `The Accom-photo ID ${photo.id} has updated.` })
    } catch (err) {
        next(err)
    } finally {
        if (req.file) fs.unlink(req.file.path)
    }
}

accomPhotoController.deletePhoto = asyncWrapper(async (req, res, next) => {
    if (isNaN(+req.params.image_id)) return next(new CustomError("Invalid Info", "InvalidInfo", 400))

    const photo = await accomPhotoService.findAccomPhotoById(+req.params.room_id)
    if (!photo) return next(new CustomError("This photo ID did not exist", "NonExist", 400))
    if (photo.accomId !== +req.params.accom_id) return next(new CustomError("Photo ID and Accom ID mismatched", "Mismatch", 400))

    const path = photo.imagePath.split("/").pop().split(".")[0]

    const deletedResponse = await cloudinary.uploader.destroy(`${cloudinaryFolder.Accom}/${path}`)
    if (deletedResponse.result === "not found") return next(new CustomError("There is an error edit the old file", "UploadError", 400))

    await accomPhotoService.deleteOneAccomPhotoById(photo.id)
    res.status(204).json({ message: "Delete success!" })
})
module.exports = accomPhotoController
