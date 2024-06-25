const userService = require("../service/user")
const { hashed } = require("../utils/bcrypt")

const userController = {}

userController.register = async (req,res,next) => {
    try {
        const data = req.body
        const existUser = await userService.findAlreadyExistedUser(data.username,data.email,data.phoneNumber)

        if (existUser) { 
            new CustomError("This email already has an account", "", 400)
        }

        existUser = await userService.find
        data.password = await hashed(data.password)

        const response = await userService.createUser(data)

        res.status(201).json(response)
    } catch (err) {
        next(err)
    }

}

userController.login = async (req,res,next) => {
    try {
        const data = req.body
        const existUser = await userService.findUserByUserName(data.userName)
    } catch (err) {
        next(err)
    }
}

module.exports = userController