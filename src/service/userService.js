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

// ตรวจสอบว่า บัญชี google ซ้ำไหม ต้องเพิ่มอันนี้เข้ามา
userService.findAlreadyExistedGoogleUser = async (googleId, email) => {
    const googleIdExists = await prisma.user.findUnique({
        where: { googleId },
    })
    const emailExists = await prisma.user.findUnique({
        where: { email },
    })
    return { googleIdExists, emailExists }
}

userService.findUserByUsername = (username) => prisma.user.findUnique({ where: { username } })
userService.findUserById = (userId) => prisma.user.findUnique({ where: { id: userId } })
userService.updateUser = (userId, data) => prisma.user.update({ where: { id: userId }, data })
userService.deleteUser = (userId) => prisma.user.update({ where: { id: userId }, data: { isActive: false } })

// ปรับ Login เพิ่มส่วนนี้
userService.findUserByEmail = (email) => prisma.user.findUnique({ where: { email } })
// ส่วนของ google login ถ้าจะเพิ่ม รูปอาจจะต้องไปปรับตัว Cloudinary ด้วยต้องคุยกับ อิฐ & bm
userService.findOrCreateUser = async (profile) => {
    let user = await prisma.user.findUnique({
        where: { googleId: profile.id },
    })

    if (!user) {
        const emailExists = await prisma.user.findUnique({ where: { email: profile.emails[0].value } })
        if (emailExists) {
            // อัปเดตข้อมูลโปรไฟล์ให้กับ user ที่มีอยู่แล้ว
            user = await prisma.user.update({
                where: { id: emailExists.id },
                data: {
                    googleId: profile.id,
                    fullName: profile.displayName,
                    // picture: profile.photos[0].value,
                },
            })
        } else {
            // สร้าง user ใหม่
            user = await prisma.user.create({
                data: {
                    email: profile.emails[0].value,
                    fullName: profile.displayName,
                    googleId: profile.id,
                    // picture: profile.photos[0].value,
                },
            })
        }
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })

    return { user, token }
}

module.exports = userService
