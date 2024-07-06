const { transactionStatus } = require("../constant/enum")
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

transactionService.confirmPayment = async (req,res,next) => {
    try {
        const transactionId = req.body.transactionId
        await prisma.transaction.update({
            where:{
                id:transactionId
            },
        data:{
            status: transactionStatus.SUCCESS
        }})

        res.status(200).json({"message": "payment status updated to SUCCESS"})
    } catch (err) {
        next(err)
    }
}

module.exports = transactionService
