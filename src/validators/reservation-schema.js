const Joi = require('joi')

exports.createReservationSchema = Joi.object({
    checkInDate: Joi.date().greater('now').required(),
    checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required(),
    customerAmount: Joi.number().integer().greater(0).required(),
    optionalRequest: Joi.string().trim(),
    customerName: Joi.string(),
    customerPhone: Joi.string().pattern(/^[0-9]{10}$/),
    customerEmail: Joi.string().email({tlds: false}),
    customerCountry: Joi.string(),
    roomId: Joi.required(),
    userId: Joi.number(),
    transaction: Joi.object({
        netPrice: Joi.number().required(),
        feeId: Joi.required()
    })
})
