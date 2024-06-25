const express = require("express")
const accomPhotoController = require("../controller/accomPhoto")
const upload = require("../middlewares/upload")
const accomPhotoRouter = express.Router()

accomPhotoRouter.post("/create", accomPhotoController.validateUser, upload.array("accom_image"), accomPhotoController.uploadPhoto)

module.exports = accomPhotoRouter
