const prisma = require("../models/prisma")
const { findAllReviewByAccomIdService } = require("../utils/controller-service/findAllReviewByAccomId")
const { harvesineService } = require("../utils/harvesineService")
const { getPhotoByAccomId } = require("./photo-service/accomPhotoService")

const wishListService = {}

wishListService.create = data => prisma.wishList.create({data})

wishListService.findWishListByUserIdAndRoomId = (userId, accomId) =>
    prisma.wishList.findFirst({where: {userId, accomId}})

wishListService.findAllWishListByUserId = async userId => {

    const defaultCoordinate = {
        lat: 13.7706167,
        lng: 100.5408732,
    }

    let userCoordinate = {
        lat : null,
        lng : null
    }
    //including min price of that accom
    const response = await prisma.wishList.findMany({
        where: {userId:userId}, include:
        {accom: {include:{room: {take:1, orderBy:{price:'asc'}}}}},
    })
    const responsePromises = response.map(async (el) => {
        const roomPrice = el.accom.room[0]?.price
        el.accom.starterPrice = +roomPrice

        const reviewResult = await findAllReviewByAccomIdService(el.accom.id)
        el.accom.overAllReview = reviewResult.overAllReview
        delete el.accom.room

        if (!userCoordinate.lat || !userCoordinate.lng) {
            userCoordinate = {...defaultCoordinate}
        }

        el.accom.distance = harvesineService(
            userCoordinate.lat,
            userCoordinate.lng,
            el.accom.lat,
            el.accom.lng
        )

        const accomImage = await getPhotoByAccomId(el.accom.id)
        el.accom.imagePath = accomImage[0].imagePath
        return el
    });

    const updatedResponse = await Promise.all(responsePromises)
    return updatedResponse
}

wishListService.deleteWishListById = (wishListId) =>
    prisma.wishList.delete({where: {id: wishListId}})

module.exports = wishListService