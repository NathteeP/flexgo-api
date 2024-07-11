const { CustomError } = require("../../config/error")
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
            return []
        }
        const allReviewsArr = allReviewsDetails.map((item) => {
            const overAllReview = (item.ratingType1 + item.ratingType2 + item.ratingType3 + item.ratingType4) / noOfReviewsType
            item.overAllReview = overAllReview
            if (item.reservation.user) {
                console.log(item.reservation.user)
                const { fullName } = item.reservation.user
                const imagePath = item.reservation.user.userPhoto[0]?.imagePath || null
                item.user = { fullName: fullName, imagePath: imagePath }
            }
            delete item.reservation
            return item
        })
        const featureReview = allReviewsArr.sort((a, b) => b.overAllReview - a.overAllReview)
        return featureReview
    } catch (err) {
        console.log(err)
        return err
    }
}
