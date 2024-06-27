const express = require("express")
const accomPhotoController = require("../controller/photo/accomPhoto")
const upload = require("../middlewares/upload")
const authenticate = require("../middlewares/authenticate")
const accomPhotoRouter = express.Router()

accomPhotoRouter.post("/create", authenticate, upload.array("accom_image"), accomPhotoController.validateUser, accomPhotoController.uploadPhoto)

module.exports = accomPhotoRouter
