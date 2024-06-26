const { role } = require("../constant/enum")

module.exports = function adminAuthenticate(req,res,next) {
    if (req.user.role !== role.ADMIN) next(new CustomError("User action not allow","NotPermitted"),401)

        next()
}