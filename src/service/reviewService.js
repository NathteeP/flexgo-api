const prisma = require("../models/prisma")
const reviewService = {}

reviewService.findAllReviewsByReserveId = (reservationId) =>
    prisma.reviews.findMany({
        where: {
            reservationId: {
                in: reservationId,
            },
        },
    })

module.exports = reviewService
