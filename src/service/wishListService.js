const prisma = require("../models/prisma")

const wishListService = {}

wishListService.create = data => prisma.wishList.create({data})

wishListService.findWishListByUserIdAndRoomId = (userId, accomId) =>
    prisma.wishList.findFirst({where: {userId, accomId}})

wishListService.findAllWishListByUserId = async userId => {
    //including min price of that accom
    const result = await prisma.wishList.findMany({
        where: {userId:userId}, include:
        {accom: {include:{room: {take:1, orderBy:{price:'asc'}}}}},
    })
    return result
}

wishListService.deleteWishListByUserIdAndRoomId = (userId, accomId) =>
    prisma.wishList.delete({where: {userId, accomId}})

module.exports = wishListService