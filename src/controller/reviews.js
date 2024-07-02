const reviewService = require("../service/reviewService")
const asyncWrapper = require("../utils/asyncWrapper")

const reviewsController = {}

reviewsController.getFeaturedReviews = asyncWrapper(async (req, res, next) => {
    // const reviews = await reviewService.findAllReviews()
    // console.log(reviews)
})

module.exports = reviewsController
