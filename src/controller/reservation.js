const { CustomError } = require("../config/error")
const reservationService = require("../service/reservationService")

const reservationController = {}

reservationController.createReservation = async (req,res,next) => {
    try {
        const data = req.body
        //เช็คว่ามีการจองโดย user เดียวกัน ในวันเช็คอินเดียวกันเหรือไม่
        const duplicatedReserv = await reservationService.checkIfDuplicate(data.userId, data.checkInDate)
        if (duplicatedReserv) {
            throw new CustomError("Duplicated reservation", "ValidationError", 400)
        }
        
        const response = reservationService.create()
        //make payment service

    } catch (err) {
        next(err)
    }

}

module.exports = reservationController