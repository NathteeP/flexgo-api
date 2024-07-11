const { CustomError } = require("../../config/error")
const prisma = require("../../models/prisma")
const userPhotoService = require("../../service/photo-service/userPhotoService")
const reservationService = require("../../service/reservationService")
const reviewService = require("../../service/reviewService")
const roomService = require("../../service/room-and-bed/roomService")

const noOfReviewsType = 4

module.exports.findAllReviewByAccomIdService = async (accomId) => {
    try {
        const allRoomId = await roomService.findAllRoomByAccomId(accomId)
        if (!allRoomId) return "This accom does not have any room registered"
        const roomIdArr = allRoomId.map((item) => item.id)
        const allReservation = await reservationService.findAllReserveByRoomId(roomIdArr)
        const allReservationId = allReservation.map((item) => item.id)
        const allReviewDetails = await reviewService.findAllReviewsByReserveId(allReservationId)
        if (allReviewDetails.length < 1) {
            const review = {
                overAllReview: 0,
                count: 0,
            }
            return review
        }
        let n = 0
        allReviewDetails.forEach((item) => {
            n += item.ratingType1 + item.ratingType2 + item.ratingType3 + item.ratingType4
        })
        n /= allReviewDetails.length * noOfReviewsType
        const review = {
            overAllReview: +n.toFixed(1),
            count: allReviewDetails.length,
        }
        return review
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports.getFeaturedReviewByAccomIdService = async (accomId) => {
    try {
        const allRoomId = await roomService.findAllRoomByAccomId(accomId)
        if (!allRoomId) return "This accom does not have any room registered"
        const allReservation = await reservationService.findAllReserveByRoomId(allRoomId.map((item) => item.id))
        const allReviewsDetails = await reviewService.findAllReviewsByReserveId(allReservation.map((item) => item.id))
        if (allReviewsDetails.length < 1) {
            const review = []
            return review
        }

        const reservationUserMap = allReservation.reduce((acc, reservation) => {
            acc[reservation.id] = reservation.userId;
            return acc;
        }, {});
        
        const allReviewsArr = allReviewsDetails.map((item) => {
            const overAllReview = (item.ratingType1 + item.ratingType2 + item.ratingType3 + item.ratingType4) / noOfReviewsType;
            return {
                ...item,
                overAllReview,
                userId: reservationUserMap[item.reservationId]
            };
        });
        const featureReview = allReviewsArr.sort((a, b) => b.overAllReview - a.overAllReview)

        //get username and review

        const userArray = allReservation.map(el => el.userId).filter(el => el)

        const reviewers = await prisma.userPhoto.findMany({
            where: { userId: { in: userArray } },
            include: {
                user: {
                    select: {
                        fullName: true
                    }
                }
            }
        });


        const featureReviewWithUsers = featureReview.map(el => ({
            ...el,
            user: reviewers.find(photoEl => photoEl.userId === el.userId) || null
        }));

        // Sort the reviews so that reviews with a user are at the beginning
        featureReviewWithUsers.sort((a, b) => (a.user ? -1 : 1) - (b.user ? -1 : 1));

        return featureReviewWithUsers
    } catch (err) {
        console.log(err)
        return err
    }
}
