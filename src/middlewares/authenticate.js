const jwt = require("jsonwebtoken")
const { CustomError } = require("../config/error")
const userService = require("../service/user")

module.exports = async function authenticate(req, res, next) {
    try {
        if (!req?.headers?.authorization) throw new Error()
        const authorization = req?.headers?.authorization.startsWith("Bearer")
            ? req.headers.authorization
            : next(new CustomError("Not found Bearer token", "InvalidToken", 401))

        const accessToken = authorization.split(" ")[1] ? authorization.split(" ")[1] : next(new CustomError("Not found Bearer token", "InvalidToken", 401))
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY ?? "key")

        const user = await userService.findUserById(payload.id)
        if (!user) next(new CustomError("User was not found", "NotFoundData", 400))
        if (user.isActive === false) next(new CustomError("User is inactive", "UserInactive", 401))
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}
