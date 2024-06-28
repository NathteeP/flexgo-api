const cloudinary = require("../config/cloudinary")

const cloudinaryUpload = async (image) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(image)
        return secure_url
    } catch (err) {
        next(err)
    }
}

module.exports = cloudinaryUpload
