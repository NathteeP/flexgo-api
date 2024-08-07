const { CustomError } = require("../config/error")
const reservationService = require("../service/reservationService")
const reviewService = require("../service/reviewService")
const asyncWrapper = require("../utils/asyncWrapper")

const reviewsController = {}

reviewsController.getFeaturedReviews = asyncWrapper(async (req, res, next) => {
    // const reviews = await reviewService.findAllReviews()
    // console.log(reviews)
})

reviewsController.getReviewByReservationId = asyncWrapper(async (req, res, next) => {
    const review = await reviewService.findReviewByReservationId(req.params.reserv_id)

    if (!review) res.status(204)

    res.status(200).json(review)
})

reviewsController.create = asyncWrapper(async (req, res, next) => {
    const reservation = await reservationService.findReservationById(req.params.reserv_id)

    if (!reservation) next(new CustomError('Reservation not existed', 'BadRequest',400))

    const existReview = await reviewService.findReviewByReservationId(req.params.reserv_id)

    if (existReview) next(new CustomError('User has already reviewed', 'BadRequest',400))
    else {
      const response = await reviewService.create(req.body)  
      res.status(201).json(response)
}
})

module.exports = reviewsController
