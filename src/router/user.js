const express = require("express")

const authenticate = require("../middlewares/authenticate")
const userController = require("../controller/user")
const adminAuthenticate = require("../middlewares/admin-authenticate")
const { registerSchema, loginSchema } = require("../validators/user-schema")
const validatorFn = require("../middlewares/validator")


const userRouter = express.Router()

userRouter.get("/:user_id", userController.getUser)
userRouter.post("/register", validatorFn(registerSchema),userController.register)
userRouter.post("/login", validatorFn(loginSchema), userController.login)
userRouter.patch("/:user_id", authenticate,userController.editUser)
userRouter.delete("/:user_id", authenticate, adminAuthenticate, userController.deleteUser)


module.exports = userRouter
