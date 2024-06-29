const { CustomError } = require("../config/error")
const { transactionStatus } = require("../constant/enum")
const prisma = require("../models/prisma")
const reservationService = require("../service/reservationService")
const transactionService = require("../service/transactionService")

const reservationController = {}

reservationController.create = async (req,res,next) => {
    try {
        await prisma.$transaction(async () => {
            
        const reservData = {...req.body} //สำหรับส่งไป create reservation
        //เช็คว่ามีการจองโดย user เดียวกัน ในวันเช็คอินเดียวกันเหรือไม่
        const duplicatedReserv = await reservationService.checkIfDuplicate(reservData.userId, reservData.checkInDate)
        if (duplicatedReserv) {
            throw new CustomError("Duplicated reservation", "ValidationError", 400)
        }
        const generatedId = await reservationService.generateId()
        console.log(generatedId)
        reservData.id = generatedId
        delete reservData.transaction
        const response = await reservationService.create(reservData)
        
        const transactionData = req.body.transaction

        transactionData.reservationId = generatedId
        transactionData.status = transactionStatus.SUCCESS
       
        await transactionService.createTable(transactionData)

        res.status(200).json(response)
    })
    } catch (err) {
        next(err)
    }

}

module.exports = reservationController