const Joi = require("joi")

exports.registerSchema = Joi.object({
    username: Joi.string().required().trim(),
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9@.#$!%*?&^]{6,}$/),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
    fullName: Joi.string().required().trim(),
    phoneNumber: Joi.string()
        .required()
        .pattern(/^[0-9]{10}$/),
})

exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})
