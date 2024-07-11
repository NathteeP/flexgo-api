const express = require("express")
const reviewsController = require("../controller/reviews")
const authenticate = require("../middlewares/authenticate")
const reviewsRouter = express.Router()

reviewsRouter.get("/feature", reviewsController.getFeaturedReviews)
reviewsRouter.get("/:reserv_id", reviewsController.getReviewByReservationId)
reviewsRouter.post("/:reserv_id", authenticate, reviewsController.create)

module.exports = reviewsRouter
