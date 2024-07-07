const express = require("express")
const reservationController = require("../controller/reservation")
const validatorFn = require("../middlewares/validator")
const { createReservationSchema } = require("../validators/reservation-schema")
const transactionService = require("../service/transactionService")
const authenticate = require("../middlewares/authenticate")
const adminAuthenticate = require("../middlewares/admin-authenticate")

const reservationRouter = express.Router()

reservationRouter.post("/create-payment-intent", transactionService.createPaymentIntent)
reservationRouter.post("/create", validatorFn(createReservationSchema), reservationController.create)
reservationRouter.get("/:reserv_id", reservationController.getReservation)
reservationRouter.patch("/payment-success", transactionService.confirmPayment)
reservationRouter.patch("/:reserv_id", authenticate, reservationController.updateReservation)
reservationRouter.delete("/:reserv_id", reservationController.deleteReservation)
reservationRouter.get("/:reserv_id/approve", reservationController.approveReservation)

module.exports = reservationRouter