const prisma = require("../models/prisma")
const nodemailer = require("nodemailer")
const { CustomError } = require("../config/error")

const otpService = {}

otpService.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString() // สร้าง OTP 6 หลัก
}

otpService.generateReferenceCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let refCode = ""
    for (let i = 0; i < 6; i++) {
        refCode += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return refCode
}

otpService.createAndSendOTP = async (guestEmail) => {
    try {
        const otpCode = otpService.generateOTP()
        const refCode = otpService.generateReferenceCode()
        const expiredAt = new Date(Date.now() + 5 * 60 * 1000) // Set อายุ OTP 5 นาที

        await prisma.oTPNumber.deleteMany({ where: { guestEmail } }) // ลบ OTP เก่า ถ้ามี
        const otpData = await prisma.oTPNumber.create({
            data: {
                guestEmail,
                otpCode,
                refCode,
                expiredAt,
            },
        })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: guestEmail,
            subject: "Your OTP Code",
            html: `<p>Your OTP code is: <strong>${otpCode}</strong></p><p>This OTP is valid for 5 minutes.</p><p>Your reference code is: <strong>${refCode}</strong></p>`,
        }
        const result = await transporter.sendMail(mailOptions)
        otpData.result = result
        return otpData
    } catch (error) {
        throw new CustomError("Failed to create and send OTP", "OTPError", 500)
    }
}

otpService.verifyOTP = async (guestEmail, otpCode, refCode) => {
    const otpRecord = await prisma.oTPNumber.findFirst({
        where: {
            guestEmail,
            otpCode,
            refCode,
            expiredAt: {
                gte: new Date(), // เช็คว่า ยังไม่หมดอายุ
            },
        },
    })

    if (!otpRecord) {
        throw new CustomError("Invalid or Expired OTP", "OTPError", 400)
    }

    return true
}

otpService.deleteOTP = async (guestEmail) => {
    await prisma.oTPNumber.deleteMany({ where: { guestEmail } })
}

module.exports = otpService
