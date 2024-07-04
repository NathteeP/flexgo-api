const { CustomError } = require("../config/error")
const userService = require("../service/userService")
const asyncWrapper = require("../utils/asyncWrapper")
const { hashed, compare } = require("../utils/bcrypt")
const getHostAndAccomByUserId = require("../utils/controller-service/getHostAndAccomByUserId")
const { sign } = require("../utils/jwt")

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
            res.status(400).json({ message: errorMessage, field: existFields })
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
        const data = req.body
        const existUser = await userService.findUserByUsername(data.username)

        if (!existUser) throw new CustomError("User did not exist", "ValidationError", 400)

        const isMatch = await compare(data.password, existUser.password)

        if (!isMatch) throw new CustomError("Wrong username or password", "ValidationError", 400)
        if (existUser.isActive === false) throw new CustomError("User is inactive", "UserInactive", 401)

        const accessToken = sign({ id: existUser.id })
        const { id, email, fullName, phoneNumber } = existUser
        const responseBody = { id, email, fullName, phoneNumber, accessToken }

        res.status(200).json(responseBody)
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
userController.googleCallback = (req, res) => {
    res.cookie("jwt", req.user.token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.redirect("http://localhost:5173") // ไว้ค่อยใส่ใน env
}

// อันนี้ต้องคุยกับอิฐ เพราะว่า ตัวนี้เป็น getAuthUser ไม่รู้ว่าเอาไปรวมกับ getUser ด้านบนได้ไหม? ด้านบนน่าจะดู user จาก param
userController.getAuthUser = async (req, res, next) => {
    try {
        const authUser = await userService.findUserById(req.user.id)

        delete authUser.password
        res.status(200).json(authUser)
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

module.exports = userController
