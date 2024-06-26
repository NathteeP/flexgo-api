const cloudinary = require("../config/cloudinary")
const asyncWrapper = require("../utils/asyncWrapper")

module.exports.cloudinaryUpload = asyncWrapper(async (image) => {
    const { secure_url } = await cloudinary.uploader.upload(image)
    return secure_url
})
