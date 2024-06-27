const express = require("express")
const authenticate = require("../middlewares/authenticate")
const userPhotoController = require("../controller/photo/userPhoto")
const upload = require("../middlewares/upload")
const userPhotoRouter = express.Router()

userPhotoRouter.post("/create", authenticate, upload.single("user_image"), userPhotoController.uploadPhoto)

module.exports = userPhotoRouter
