const express = require("express")
const accomAmenitiesController = require("../controller/acoomAmenities")
const authenticate = require("../middlewares/authenticate")
const accomAmenitiesRouter = express.Router()

accomAmenitiesRouter.post("/create", authenticate, accomAmenitiesController.verifyUserAndAccomBeforeCreate)

module.exports = accomAmenitiesRouter
