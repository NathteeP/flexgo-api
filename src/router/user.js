const express = require("express")
const authenticate = require("../middlewares/authenticate")
const userController = require("../controller/user")
const adminAuthenticate = require("../middlewares/admin-authenticate")
const { registerSchema, loginSchema } = require("../validators/user-schema")
const validatorFn = require("../middlewares/validator")
const passport = require("passport")

const userRouter = express.Router()

userRouter.get("/me", authenticate, userController.getAuthUser)
userRouter.get("/:user_id", userController.getUser)
userRouter.post("/register", validatorFn(registerSchema), userController.register)
userRouter.post("/login", validatorFn(loginSchema), userController.login)
userRouter.patch("/:user_id", authenticate, userController.editUser)
userRouter.delete("/:user_id", authenticate, adminAuthenticate, userController.deleteUser)

// ส่วนของ google login
userRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
userRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), userController.googleCallback)
userRouter.post("/logout", userController.logout)

module.exports = userRouter
