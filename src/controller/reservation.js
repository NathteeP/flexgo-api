const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")
const { CustomError } = require("../config/error")
const { transactionStatus } = require("../constant/enum")
const prisma = require("../models/prisma")
const reservationService = require("../service/reservationService")
const roomService = require("../service/room-and-bed/roomService")
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
        reservData.id = generatedId
        delete reservData.transaction
        const response = await reservationService.create(reservData)
        
        //save transaction data into DB
        const transactionData = req.body.transaction

        transactionData.reservationId = generatedId
        transactionData.status = transactionStatus.SUCCESS
       
        await transactionService.createTable(transactionData)

        res.status(201).json(response)
    })
    } catch (err) {
        next(err)
    }
}

reservationController.getReservation = async (req,res,next) => {
    try{
        const response = await reservationService.findReservationById(req.params.reserv_id)
        
        if (!response) throw new CustomError('Reservation id not found','NotFoundError',404)

        response.room = await roomService.getRoomAndBedByRooomId(response.roomId)
            
        res.status(200).json(response)
     
    } catch (err) {
        next(err)
    }
}

reservationController.updateReservation = async (req,res,next) => {
    try{
        const updateData = req.body
        if (updateData.checkInDate) updateData.checkInDate = new Date(updateData.checkInDate)
        if (updateData.checkOutDate) updateData.checkOutDate = new Date(updateData.checkInDate)
    
        const response = await reservationService.updateReservationById(req.params.reserv_id, req.body)

        res.status(200).json(response)

    } catch (err) {

        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === 'P2025') next(new CustomError('Reservation id not found','NotFoundError',404))
        }

        next(err)
    }
}

reservationController.deleteReservation = async (req,res,next) => {
    //use in extreme case only. Else, use update status: CANCELED instead
    try {
        const response = await reservationService.findReservationById(req.params.reserv_id)
        if (!response) throw new CustomError('Reservation id not found','NotFoundError',404)


        await reservationService.deleteReservationById(req.params.reserv_id)
        res.status(200).json({"message": "deleted successfully"})
    } catch (err) {
        next(err)
    }
}

module.exports = reservationController