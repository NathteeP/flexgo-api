const prisma = require("../../models/prisma")
const userPhotoService = {}

userPhotoService.uploadPhoto = (data) => prisma.userPhoto.create({ data })

module.exports = userPhotoService
