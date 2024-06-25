const express = require("express")

const authenticate = require("../middlewares/authenticate")
const userController = require("../controller/user")
const { userValidator } = require("../middlewares/validator")
const { registerSchema, loginSchema } = require("../validators/user-schema")

const userRoute = express.Router()

// userRoute.get("/:user_id", userController.getUser)
userRoute.post("/register", userValidator(registerSchema),userController.register)
userRoute.post("/login", userValidator(loginSchema), userController.login)


module.exports = userRoute
