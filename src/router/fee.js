const express = require("express")
const feeController = require("../controller/fee")
const authenticate = require("../middlewares/authenticate")

const feeRouter = express.Router()

feeRouter.get("/:fee_id", feeController.getFeeById)
feeRouter.patch("/:fee_id", feeController.updateFee)
feeRouter.post("/create",authenticate, feeController.createFee)

module.exports = feeRouter