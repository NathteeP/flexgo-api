const { CustomError } = require("../config/error")
const asyncWrapper = require("../utils/asyncWrapper")
const { cloudinaryUpload } = require("../utils/cloudinaryUpload")
const cloudinary = require("../config/cloudinary")
const accomPhotoService = require("../service/accomPhotoService")
const fs = require("fs/promises")
const accomService = require("../service/accomService")
const accomPhotoController = {}

accomPhotoController.validateUser = asyncWrapper(async (req, res, next) => {
    const user = await accomService.findUserIdByAccomId(+req.body.accomId)
    if (!user || user.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unauthorized", 401))
    next()
})

accomPhotoController.uploadPhoto = async (req, res, next) => {
    try {
        if (!req.files) return next(new CustomError("No data sent", "NoData", 400))
        const result = req.files.reduce((acc, curr) => {
            const response = cloudinary.uploader.upload(curr.path)
            acc.push(response)
            return acc
        }, [])
        const uploadedPhotoArr = await Promise.allSettled(result)
        const data = uploadedPhotoArr.reduce((acc, curr) => {
            const objToPush = {}
            objToPush.accomId = +req.body.accomId
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

module.exports = accomPhotoController
