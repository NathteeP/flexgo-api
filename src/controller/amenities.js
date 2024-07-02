const amenityTypeService = require("../service/amenities/amenityTypeService")
const asyncWrapper = require("../utils/asyncWrapper")

const amenitiesController = {}

amenitiesController.getAllAmenities = asyncWrapper(async (req, res, next) => {
    const amenities = await amenityTypeService.findAllAmenityType()
    res.status(200).json(amenities)
})

module.exports = amenitiesController
