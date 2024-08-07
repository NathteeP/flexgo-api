const express = require("express")
const accomPhotoController = require("../controller/photo/accomPhoto")
const upload = require("../middlewares/upload")
const authenticate = require("../middlewares/authenticate")
const accomPhotoRouter = express.Router()

accomPhotoRouter.post(
    "/create/:accom_id",
    authenticate,
    upload.array("accom_image"),
    accomPhotoController.validateUser,
    accomPhotoController.uploadPhoto,
)

accomPhotoRouter.patch(
    "/edit/:accom_id",
    authenticate,
    accomPhotoController.validateUser,
    upload.single("accom_image"),
    accomPhotoController.editPhoto,
)

accomPhotoRouter.delete("/delete/:accom_id/:image_id", authenticate, accomPhotoController.validateUser, accomPhotoController.deletePhoto)

module.exports = accomPhotoRouter
