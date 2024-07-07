const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")
const { CustomError } = require("../config/error")
const { transactionStatus, reservationStatus } = require("../constant/enum")
const prisma = require("../models/prisma")
const reservationService = require("../service/reservationService")
const roomService = require("../service/room-and-bed/roomService")
const transactionService = require("../service/transactionService")

const reservationController = {}

reservationController.create = async (req,res,next) => {
    try {
        await prisma.$transaction(async () => {

        let response
        let status
            
        const reservData = {...req.body} //สำหรับส่งไป create reservation
        //เช็คว่ามีการจองโดย user เดียวกัน ในวันเช็คอินเดียวกันเหรือไม่
        const duplicatedReserv = await reservationService.checkIfDuplicate(reservData.customerEmail, reservData.checkInDate)
        if (duplicatedReserv) {
            response = duplicatedReserv
            status = 200
        }
        else {
            const generatedId = await reservationService.generateId()
        reservData.id = generatedId
        delete reservData.transaction
        response = await reservationService.create(reservData)
        status = 201
        }
        const transactionData = req.body.transaction
        //save transaction data into DB

        transactionData.reservationId = response.id
        transactionData.status = transactionStatus.PENDING
        //attach transaction data to response body
        response.transaction = await transactionService.createTable(transactionData)

        res.status(status).json(response)
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
        response.transaction = await transactionService.findSuccessTransactionByReservationId(req.params.reserv_id)
            
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

reservationController.approveReservation = async (req,res,next) => {
    try {
        const approveBody = {status: reservationStatus.CONFIRMED}
        const response = await reservationService.updateReservationById(req.params.reserv_id, approveBody)

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

module.exports = reservationController