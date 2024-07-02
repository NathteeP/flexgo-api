const express = require("express")
const reviewsController = require("../controller/reviews")
const reviewsRouter = express.Router()

reviewsRouter.get("/feature", reviewsController.getFeaturedReviews)

module.exports = reviewsRouter
