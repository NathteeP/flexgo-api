const express = require("express")
const reservationController = require("../controller/reservation")
const validatorFn = require("../middlewares/validator")
const { createReservationSchema } = require("../validators/reservation-schema")
const transactionService = require("../service/transactionService")

const reservationRouter = express.Router()

reservationRouter.post('/create-payment-intent', transactionService.createPaymentIntent)
reservationRouter.post("/create", validatorFn(createReservationSchema), reservationController.create)

module.exports = reservationRouter