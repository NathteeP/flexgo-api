const express = require("express")
const accomController = require("../controller/accom")
const authenticate = require("../middlewares/authenticate")
const executeTransaction = require("../service/transaction/executeTransaction")
const accomRouter = express.Router()

accomRouter.get("/allrooms/:accom_id", accomController.getAllRoomByAccomId)

accomRouter.post("/availrooms/:accom_id", accomController.getAvailRoomByAccomId)

accomRouter.get("/detail/:accom_id", accomController.getAccomDetailByAccomId)

accomRouter.post("/avail", accomController.findAvailAccomByLatLng)

accomRouter.post("/create", authenticate, accomController.verifyInfoAndFindNearbyPlaceCreate, accomController.createAccom)

accomRouter.patch("/edit/:accom_id", authenticate, accomController.verifyUserAndAccom, accomController.editAccomDetails)

accomRouter.delete("/delete/:accom_id", authenticate, accomController.verifyUserAndAccom, accomController.deleteAccom)

accomRouter.get("/all/:user_id", authenticate, accomController.getAllAccomByUserId)

accomRouter.post("/create/accom-room", authenticate, executeTransaction)
module.exports = accomRouter
