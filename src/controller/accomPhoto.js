const multer = require("multer")
const { CustomError } = require("../config/error")
const asyncWrapper = require("../utils/asyncWrapper")

const accomPhotoController = {}

accomPhotoController.validateUser = asyncWrapper(async (req, res, next) => {
    if (!req.body.accomId || isNaN(req.body.accomId)) return next(new CustomError("Invalid Information", "InvalidInfo", 400))
    next()
})

accomPhotoController.uploadPhoto = asyncWrapper(async (req, res, next) => {
    if (!req.files) return next(new CustomError("No data sent", "NoData", 400))

    const data = req.files.reduce((acc, curr) => {})
    console.log(req.files)
})

module.exports = accomPhotoController
