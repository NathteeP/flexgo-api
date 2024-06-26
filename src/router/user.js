const express = require("express")

const authenticate = require("../middlewares/authenticate")
const userController = require("../controller/user")
const { userValidator } = require("../middlewares/validator")
const { registerSchema, loginSchema } = require("../validators/user-schema")
const adminAuthenticate = require("../middlewares/admin-authenticate")

const userRoute = express.Router()

userRoute.get("/:user_id", userController.getUser)
userRoute.post("/register", userValidator(registerSchema),userController.register)
userRoute.post("/login", userValidator(loginSchema), userController.login)
userRoute.patch("/:user_id", authenticate,userController.editUser)
userRoute.delete("/:user_id", authenticate, adminAuthenticate, userController.deleteUser)


module.exports = userRoute
