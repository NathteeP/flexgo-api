const prisma = require("../models/prisma")
const jwt = require("jsonwebtoken")

const userService = {}

userService.createUser = (data) => prisma.user.create({ data })

userService.findAlreadyExistedUser = async (username, email, phoneNumber) => {
    const usernameExists = await prisma.user.findUnique({
        where: { username },
    })
    const emailExists = await prisma.user.findUnique({
        where: { email },
    })
    const phoneNumberExists = await prisma.user.findUnique({
        where: { phoneNumber },
    })
    return { usernameExists, emailExists, phoneNumberExists }
}

userService.findUserByUsername = (username) => prisma.user.findUnique({ where: { username } })
userService.findUserById = (userId) => prisma.user.findUnique({ where: { id: userId } })
userService.updateUser = (userId, data) => prisma.user.update({ where: { id: userId }, data })
userService.deleteUser = (userId) => prisma.user.update({ where: { id: userId }, data: { isActive: false } })

// ส่วนของ google login
userService.findOrCreateUser = async (profile) => {
    let user = await prisma.user.findUnique({
        where: { googleId: profile.id },
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: profile.emails[0].value,
                name: profile.displayName,
                googleId: profile.id,
                picture: profile.photos[0].value,
            },
        })
    } else {
        user = await prisma.user.update({
            where: { googleId: profile.id },
            data: { picture: profile.photos[0].value },
        })
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })

    return { user, token }
}

userService.getUserFromToken = async (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const authUser = await prisma.user.findUnique({
        where: { id: payload.id },
    })
    return authUser
}

module.exports = userService
