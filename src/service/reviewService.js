const prisma = require("../models/prisma")
const reviewService = {}

reviewService.findAllReviewsByReserveId = (reservationId) =>
    prisma.reviews.findMany({
        where: {
            reservationId: {
                in: reservationId,
            },
        },
        include: {
            reservation: {
                include: {
                    user: {
                        include: {
                            userPhoto: {
                                select: {
                                    imagePath: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    })

// reviewService.findAllReviews = () => prisma.reviews.

module.exports = reviewService
