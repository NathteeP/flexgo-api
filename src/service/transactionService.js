const prisma = require("../models/prisma")

const transactionService = {}
const stripe = require("stripe")(process.env.STRIPE_API_KEY)

transactionService.createPaymentIntent = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        ...req.body,
        currency: "thb",
    })

    res.send({
        clientSecret: paymentIntent.client_secret,
    })
}

transactionService.createTable = (data) => prisma.transaction.create({ data })

module.exports = transactionService
