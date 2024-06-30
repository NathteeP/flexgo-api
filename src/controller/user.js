const { CustomError } = require("../config/error")
const userService = require("../service/userService")
const { hashed, compare } = require("../utils/bcrypt")
const { sign } = require("../utils/jwt")

const userController = {}

userController.getUser = async (req, res, next) => {
    try {
        const response = await userService.findUserById(+req.params.user_id)
        if (!response) throw new CustomError("userId does not exist", "UserNotFound", 404)
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
        if (req.user.id !== data.id || +req.params.user_id !== data.id) throw new CustomError('UserId does not match', "ValidationError", 400)
        const response = await userService.updateUser(data.id,data)
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
module.exports = userController
