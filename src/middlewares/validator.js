exports.userValidator = (schema) => {
    return (req,res,next) =>  {
        const {value, error} = schema.validate(req.body)
        if (error) new CustomError("User already has an account", "UserAlreadyExisted", 400)
            req.input = value
            next()
    }
    }
    