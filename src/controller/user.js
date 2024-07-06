const { CustomError } = require("../config/error")
const prisma = require("../models/prisma")
const otpService = require("../service/otpService")
const userPhotoService = require("../service/photo-service/userPhotoService")
const reservationService = require("../service/reservationService")
const userService = require("../service/userService")
const wishListService = require("../service/wishListService")
const asyncWrapper = require("../utils/asyncWrapper")
const { hashed, compare } = require("../utils/bcrypt")
const getHostAndAccomByUserId = require("../utils/controller-service/getHostAndAccomByUserId")
const jwt = require("../utils/jwt")

const userController = {}

userController.getUser = async (req, res, next) => {
    try {
        const response = await userService.findUserById(+req.params.user_id)
        if (!response) throw new CustomError("userId does not exist", "UserNotFound", 404)

        delete response.password

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

// มีปรับตรงนี้ ต้องคุยกับ อิฐ เพิ่ม return บรรทัดที่ 41
userController.register = async (req, res, next) => {
    try {
        const data = req.body
        const { usernameExists, emailExists, phoneNumberExists } = await userService.findAlreadyExistedUser(
            data.username,
            data.email,
            data.phoneNumber,
        )
        if (usernameExists || emailExists || phoneNumberExists) {
            const existFields = []
            if (usernameExists) existFields.push("username")
            if (emailExists) existFields.push("email")
            if (phoneNumberExists) existFields.push("phoneNumber")

            const errorMessage = `The following fields are already in use: ${existFields.join(", ")} `
            return res.status(400).json({ message: errorMessage, field: existFields })
        }

        data.password = await hashed(data.password)

        const response = await userService.createUser(data)
        delete response.password
        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

userController.login = async (req, res, next) => {
    try {
        await prisma.$transaction(async (tx) => {
        const data = req.body
        const existUser = await userService.findUserByUsername(data.username)

        if (!existUser) throw new CustomError("User did not exist", "ValidationError", 400)

        const isMatch = await compare(data.password, existUser.password)

        if (!isMatch) throw new CustomError("Wrong username or password", "ValidationError", 400)
        if (existUser.isActive === false) throw new CustomError("User is inactive", "UserInactive", 401)

        const responseBody = {}
        const accessToken = jwt.sign({ id: existUser.id })
        responseBody.profileImage = await userPhotoService.findPhotoByUserId(existUser.id)
        responseBody.wishlist = await wishListService.findAllWishListByUserId(existUser.id)
        responseBody.propertyMessage = {}
        responseBody.bookingHistory = await reservationService.findAllReservationByUserId(existUser.id)
        delete responseBody.password

        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json(responseBody)
    })
    } catch (err) {
        next(err)
    }
}

userController.editUser = async (req, res, next) => {
    try {
        const data = req.body
        //already validated -- req.user is exist in db
        //only need to check if data.id === req.user.id
        if (req.user.id !== data.id || +req.params.user_id !== data.id) throw new CustomError("UserId does not match", "ValidationError", 400)
        const response = await userService.updateUser(data.id, data)
        delete response.password
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

userController.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(+req.params.user_id)
        res.status(200).json({ message: "Delete successfully" })
    } catch (err) {
        next(err)
    }
}

// ส่วนของ Google Login
// Merge ข้อมูล user ถ้า เจอว่า profile มันซ้ำกัน
userController.googleCallback = async (req, res, next) => {
    try {
        const profile = req.user.user // ดึงข้อมูล profile จาก req.user.profile

        if (!profile.email) {
            throw new CustomError("Google profile does not contain emails", "InvalidProfile", 400)
        }
        const email = profile.email
        const googleId = profile.googleId
        const fullName = profile.fullName

        const updatedUser = await userService.findOrCreateUserWithGoogle(email, googleId, fullName)

        // สร้าง JWT
        const token = jwt.sign({ id: updatedUser.id })

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.redirect("http://localhost:5173")
    } catch (error) {
        next(error)
    }
}

userController.getAuthUser = async (req, res, next) => {
    try {
        await prisma.$transaction(async (tx) => {
            const authUser = await userService.findUserById(req.user.id)
            authUser.profileImage = await userPhotoService.findPhotoByUserId(req.user.id)
            authUser.wishlist = await wishListService.findAllWishListByUserId(req.user.id)
            authUser.propertyMessage = {}
            authUser.bookingHistory = await reservationService.findAllReservationByUserId(req.user.id)
            delete authUser.password

            res.status(200).json(authUser)
        })
    } catch (err) {
        next(err)
    }
}

userController.logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: false,
        maxAge: 0,
    })
    res.json({ message: "Logout successful" })
}

// Get Host and Accom Data
userController.getHostAndAccomDetail = asyncWrapper(async (req, res, next) => getHostAndAccomByUserId(req, res, next))

// ส่วนของ forgotPassword
userController.requestOTP = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            throw new CustomError("Email is required", "ValidationError", 400)
        }

        const validUser = await userService.findUserByEmail(email)
        if (!validUser) {
            throw new CustomError("User not found", "NotFoundError", 404)
        }

        const result = await otpService.createAndSendOTP(email)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

userController.verifyOTP = async (req, res, next) => {
    try {
        const { email, otp, refCode } = req.body
        if (!email || !otp || !refCode) {
            throw new CustomError("Email, OTP, and Reference Code are required", "ValidationError", 400)
        }

        const result = await otpService.verifyOTP(email, otp, refCode)
        res.status(200).json(result.guestEmail)
    } catch (error) {
        next(error)
    }
}

userController.changePassword = async (req, res, next) => {
    try {
        const { userEmail, newPassword } = req.body

        const hashedPassword = await hashed(newPassword)
        await userService.updatePasswordByEmail(userEmail, hashedPassword)
        await otpService.deleteOTP(userEmail)
        res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
        next(error)
    }
}

module.exports = userController
