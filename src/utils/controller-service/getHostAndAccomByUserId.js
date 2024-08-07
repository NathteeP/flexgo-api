const { CustomError } = require("../../config/error")
const accomService = require("../../service/accomService")
const accomPhotoService = require("../../service/photo-service/accomPhotoService")
const userPhotoService = require("../../service/photo-service/userPhotoService")
const roomService = require("../../service/room-and-bed/roomService")
const userService = require("../../service/userService")
const { findAllReviewByAccomIdService, getFeaturedReviewByAccomIdService } = require("./findAllReviewByAccomId")
const { findUserHostingTime } = require("./findUserHostingTime")

const getHostAndAccomByUserId = async (req, res, next) => {
    const isUserExist = await userService.findUserById(+req.params.user_id)
    if (!isUserExist) return CustomError(`The user ID ${+req.params.user_id} does not exist`, "NonExist", 400)

    const userPhoto = await userPhotoService.findPhotoByUserId(isUserExist.id)
    isUserExist.photo = userPhoto.imagePath

    const hostTime = await findUserHostingTime(isUserExist.id)
    isUserExist.hostTime = hostTime

    const allAccom = await accomService.findAllAccomByUserId(isUserExist.id)
    if (allAccom.length < 1) return CustomError("This user does not host any accommodation", "InvalidInfo", 400)

    const allAccomPhoto = await accomPhotoService.findManyAccomPhotoByManyAccomId(allAccom.map((item) => item.id))
    const firstAccomPhoto = allAccomPhoto.reduce((acc, curr) => {
        if (acc[curr.accomId]) {
            return acc
        }
        acc[curr.accomId] = curr.imagePath
        return acc
    }, {})

    allAccom.forEach((item) => {
        if (firstAccomPhoto[item.id]) {
            item.image = firstAccomPhoto[item.id]
        }
        return item
    })

    const accoms = []
    const featureReview = []
    for (let item of allAccom) {
        item.reviews = await findAllReviewByAccomIdService(item.id)
        accoms.push(item)
        featureReview.push(...(await getFeaturedReviewByAccomIdService(item.id)))
    }

    const hostReview = featureReview.length > 1 ? featureReview.reduce((acc, curr) => acc + curr.overAllReview, 0) / featureReview.length : 0
    isUserExist.rating = { overAll: hostReview.toFixed(1), count: featureReview.length }

    const minPrice = await roomService.findMinPriceByManyAccomId(accoms.map((item) => item.id))
    const priceTable = minPrice.reduce((acc, curr) => {
        acc[curr.accomId] = curr._min.price
        return acc
    }, {})

    accoms.forEach((item) => {
        item.minPrice = priceTable[item.id]
        return item
    })
    res.status(200).json({ user: { ...isUserExist }, accoms, featureReview })
}

module.exports = getHostAndAccomByUserId
