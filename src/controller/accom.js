const { CustomError } = require("../config/error")
const geocodeService = require("../google-client/geocodeService")
const accomService = require("../services/accomService")
const asyncWrapper = require("../utils/asyncWrapper")

const accomController = {}

accomController.create = asyncWrapper(async (req, res, next) => {
    if (!req.body.accom || !req.body.accom.address || !req.body.accom.name || !req.body.description) {
        next(new CustomError("Please provide information about your accomodation", "InvalidInfo", 400))
    }

    if (!req.body.accom.type) {
        next(new CustomError("Please choose your ac commodation type.", "InvalidInfo", 400))
    }

    const isAddressAcquired = await accomService.findAccomByAddress(req.body.accom.address)
    if (isAddressAcquired) next(new CustomError("This address has already been registered.", "ExistsAddress", 400))

    const response = await geocodeService.findLatLngFromAddress(req.body.accom.address)
    const existsAccom = await accomService.findAccomByLatLng(response.lat + "", response.lng + "")
    if (existsAccom) {
        next(new CustomError("This latitude and longitude has already been registered.", "Exists LatLng", 400))
    }

    if (!req.body.accom.description.trim()) next(new CustomError("Please provide us your accommodation details.", "InvalidDescription", 400))

    const result = await accomService.createAccom(req.body.accom)
    res.status(200).json(result)
})

accomController.uploadPhoto = asyncWrapper(async (req, res, next) => {})

module.exports = accomController
