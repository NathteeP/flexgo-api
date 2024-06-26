const { CustomError } = require("../config/error")
const asyncWrapper = require("../utils/asyncWrapper")
const { cloudinaryUpload } = require("../utils/cloudinaryUpload")
const cloudinary = require("../config/cloudinary")
const accomPhotoService = require("../services/accomPhotoService")

const accomPhotoController = {}

accomPhotoController.validateUser = asyncWrapper(async (req, res, next) => {
    // if (!req.body.accomId || isNaN(+req.body.accomId)) return next(new CustomError("Invalid information", "InvalidInfo", 400))
    next()
})

accomPhotoController.uploadPhoto = asyncWrapper(async (req, res, next) => {
    if (!req.files) return next(new CustomError("No data sent", "NoData", 400))
    const result = req.files.reduce((acc, curr) => {
        const response = cloudinary.uploader.upload(curr.path)
        acc.push(response)
        return acc
    }, [])
    const uploadedPhotoArr = await Promise.allSettled(result)
    const data = uploadedPhotoArr.reduce((acc, curr) => {
        const objToPush = {}
        objToPush.accommodationId = +req.body.accomId
        objToPush.imagePath = curr.value.secure_url
        acc.push(objToPush)
        return acc
    }, [])
    const response = await accomPhotoService.uploadPhoto(data)
    res.status(201).json(response)
})

module.exports = accomPhotoController
