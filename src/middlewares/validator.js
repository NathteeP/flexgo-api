const { CustomError } = require("../config/error")

const validatorFn = (schema) => {
    return (req,res,next) =>  {

        const {value, error} = schema.validate(req.body)
        if (error) throw new CustomError(error.details[0].message, "ValidationError", 400)
            req.body = value
            next()
    }
    }

module.exports = validatorFn