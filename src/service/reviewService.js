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
    
reviewService.findReviewByReservationId = (reservationId) => 
        prisma.reviews.findFirst({where:{reservationId}})

reviewService.create = (data) => 
        prisma.reviews.create({data})

module.exports = reviewService
