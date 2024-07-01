const jwt = require("jsonwebtoken")
const { CustomError } = require("../config/error")
const userService = require("../service/userService")

module.exports = async function authenticate(req, res, next) {
    try {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        const accessToken = req.cookies.jwt
        if (!accessToken) throw new CustomError("Token not found", "InvalidToken", 401)

        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY ?? "key")

        const authUser = await userService.findUserById(payload.id)
        if (!authUser) next(new CustomError("User was not found", "NotFoundData", 400))
        if (user.isActive === false) next(new CustomError("User is inactive", "UserInactive", 401))
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}
