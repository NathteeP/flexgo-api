const express = require("express")
const amenitiesController = require("../controller/amenities")
const amenitiesRouter = express.Router()

amenitiesRouter.get("/all", amenitiesController.getAllAmenities)

module.exports = amenitiesRouter
