const { CustomError } = require("../config/error")
const reviewService = require("../service/reviewService")
const wishListService = require("../service/wishListService")
const { findAllReviewByAccomIdService } = require("../utils/controller-service/findAllReviewByAccomId")

const wishListController = {}

wishListController.create = async (req,res,next) => {
    try {
        const duplicatedWishList = await wishListService
        .findWishListByUserIdAndRoomId(req.user?.id, +req.params.accom_id)

        if (duplicatedWishList) throw new CustomError("Room is already user's favorite","ValidationError",400)

        const response = await wishListService.create({userId: req.user?.id,
            accomId: +req.params.accom_id
        })

        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

wishListController.getAllWishListRoom = async (req, res, next) => {
    try {
        const response = await wishListService.findAllWishListByUserId(req.user?.id)

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

wishListController.delete = async (req,res,next) => {
    try {
        const existedWishList = await wishListService
        .findWishListByUserIdAndRoomId(req.user.id, +req.params.accom_id)

        if (!existedWishList) throw new CustomError("Room is not on user's wishlist","ValidationError",400)

        await wishListService.deleteWishListById(existedWishList.id)

        res.status(200).json({message: "deleted succesfully"})

    } catch (err) {
        next(err)
    }
}

module.exports = wishListController