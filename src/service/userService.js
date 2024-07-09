const prisma = require("../models/prisma")

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

// ฟังก์ชันช่วยสร้าง search filters
const createSearchFilters = (searchTerm) => {
    const filters = [
        { username: { contains: searchTerm } },
        { email: { contains: searchTerm } },
        { fullName: { contains: searchTerm } },
        { phoneNumber: { contains: searchTerm } },
    ]

    // ถ้า searchTerm เป็นตัวเลข ให้เพิ่มการกรอง id เข้าไปด้วย
    if (!isNaN(parseInt(searchTerm))) {
        filters.push({ id: { equals: parseInt(searchTerm) } })
    }

    return filters
}

// จัดการเรื่อง Search
userService.findAllUsers = (page, sortKey, sortOrder, searchTerm) => {
    const skip = (page - 1) * 10
    const take = 10
    const searchFilters = createSearchFilters(searchTerm)

    // ตรวจสอบค่า sortOrder และแปลงให้ถูกต้อง
    const order = sortOrder === "ascending" ? "asc" : sortOrder === "descending" ? "desc" : "asc"

    // ตรวจสอบว่า sortKey ถูกต้องหรือไม่
    const validSortKeys = ["id", "username", "email", "fullName", "phoneNumber", "createdAt"]
    const sortKeyToUse = validSortKeys.includes(sortKey) ? sortKey : "createdAt"

    return prisma.user.findMany({
        where: {
            OR: searchFilters,
        },
        orderBy: {
            [sortKeyToUse]: order,
        },
        skip,
        take,
        include: {
            userPhoto: true,
        },
    })
}

// นับ users
userService.countUsers = (searchTerm) => {
    const searchFilters = createSearchFilters(searchTerm)

    return prisma.user.count({
        where: {
            OR: searchFilters,
        },
    })
}

userService.findUserByUsername = (username) => prisma.user.findUnique({ where: { username } })
userService.findUserById = (userId) => prisma.user.findUnique({ where: { id: userId } })
userService.updateUser = (userId, data) => prisma.user.update({ where: { id: userId }, data })
userService.deleteUser = (userId) => prisma.user.update({ where: { id: userId }, data: { isActive: false } })

// ปรับ Login เพิ่มส่วนนี้
userService.findUserByEmail = (email) => prisma.user.findUnique({ where: { email } })
// ส่วนของ google login ถ้าจะเพิ่ม รูปอาจจะต้องไปปรับตัว Cloudinary ด้วยต้องคุยกับ อิฐ & bm
userService.findOrCreateUserWithGoogle = async (email, googleId, fullName, profilePicture) => {
    let user
    await prisma.$transaction(async (tx) => {
        const googleIdExists = await tx.user.findUnique({
            where: { googleId },
        })
        const emailExists = await tx.user.findUnique({
            where: { email },
        })

        if (emailExists && !googleIdExists) {
            user = await tx.user.update({
                where: { id: emailExists.id },
                data: {
                    googleId: googleId,
                    fullName: fullName,
                },
            })

            await tx.userPhoto.create({
                data: {
                    userId: user.id,
                    imagePath: profilePicture,
                },
            })
        } else if (!emailExists && !googleIdExists) {
            user = await tx.user.create({
                data: {
                    email: email,
                    googleId: googleId,
                    fullName: fullName,
                },
            })

            await tx.userPhoto.create({
                data: {
                    userId: user.id,
                    imagePath: profilePicture,
                },
            })
        } else if (googleIdExists) {
            user = googleIdExists

            // อัปเดตรูปโปรไฟล์
            await tx.userPhoto.updateMany({
                where: { userId: user.id },
                data: { imagePath: profilePicture },
            })
        }
    })

    console.log(user)
    return user
}

// เกี่ยวกับ forgot password
userService.updatePasswordByEmail = async (email, newPassword) => {
    return prisma.user.update({
        where: { email },
        data: { password: newPassword },
    })
}

module.exports = userService
