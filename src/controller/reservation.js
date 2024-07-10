const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")
const { CustomError } = require("../config/error")
const { transactionStatus, reservationStatus } = require("../constant/enum")
const prisma = require("../models/prisma")
const reservationService = require("../service/reservationService")
const roomService = require("../service/room-and-bed/roomService")
const transactionService = require("../service/transactionService")
const nodemailer = require("nodemailer")
const reservationEmailTemplate = require("../utils/reservationEmailTemplate")
const formatDate = require("../utils/formatDate")
const accomService = require("../service/accomService")
const dayjs = require("dayjs")

const reservationController = {}

reservationController.create = async (req, res, next) => {
    try {
      const { body } = req
      const reservData = { ...body } // Copy request body to reservData
  
      const response = await prisma.$transaction(async (prisma) => {
        let response
        let status
  
        // Check for duplicate reservations
        const duplicatedReserv = await reservationService.checkIfDuplicate(reservData.customerEmail, reservData.checkInDate)
        if (duplicatedReserv) {
          response = duplicatedReserv
          status = 200
        } else {
          // Generate a new reservation ID
          const generatedId = await reservationService.generateId()
          reservData.id = generatedId
          delete reservData.transaction
  
          // Create a new reservation
          response = await reservationService.create(reservData)
          status = 201
        }

        const roomResponse = await prisma.room.findUnique({where:{id:body.roomId}, include:{accom:{select:{name:true}}}})
        const accom = roomResponse.accom.name
        // Prepare transaction data
        const transactionData = body.transaction
        transactionData.reservationId = response.id
        transactionData.status = transactionStatus.PENDING
  
        // Save transaction data into the database and attach to response
        response.transaction = await transactionService.createTable(transactionData)

        //========================SENDING EMAIL========================================
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
        })
  
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: reservData.customerEmail,
          subject: "Your reservation is completed",
          html: reservationEmailTemplate(
              response.id, 
              formatDate(reservData.checkInDate),
              formatDate(reservData.checkOutDate),
              accom
          )
        }
        await transporter.sendMail(mailOptions)

        // Return the response and status
        return { response, status }
      })

  
      res.status(response.status).json(response.response)
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

reservationController.getAllHostReservationByHostId = async (req, res, next) => {
  try {
      const { page = 1, sortKey = "checkInDate", sortOrder = "desc", searchTerm = "" } = req.query;

      // Fetch accommodations
      const allAccom = await accomService.findAllAccomByUserId(+req.params.user_id);
      const accomArray = allAccom.map(el => el.id);

      // Fetch rooms
      const allRoom = await roomService.findManyRoomWithManyAccomId(accomArray);
      const allRoomWithAccomName = allRoom.map(el => {
          return { ...el, accomName: (allAccom.find(accEl => accEl.id === el.accomId)).name };
      });
      const roomArray = allRoom.map(el => el.id);

      // Fetch reservations
      const allReserv = await reservationService.findAllReserveByRoomId(roomArray);
      const response = allReserv.map(el => {
          const selectedRoom = allRoomWithAccomName.find(roomEl => roomEl.id === el.roomId);
          return {
              ...el,
              accomName: selectedRoom.accomName,
              roomType: selectedRoom.roomType,
              roomName: selectedRoom.name
          };
      });

      // Filter reservations
      const filteredRes = response.filter(el => {
        const customerName = el.customerName || '';
        const reservationId = el.id || '';
        const accomName = el.accomName || '';
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return customerName.toLowerCase().includes(lowerCaseSearchTerm) ||
               reservationId.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
               accomName.toLowerCase().includes(lowerCaseSearchTerm);
      });


      // Sort reservations
      function sortReservations(reservations, sortKey, sortOrder = 'desc') {
        return reservations.sort((a, b) => {
          let aValue = a[sortKey];
          let bValue = b[sortKey];
  
          // If sorting by date, convert strings to Date objects
          if (sortKey === 'checkInDate' || sortKey === 'checkOutDate') {
            aValue = dayjs(aValue);
            bValue = dayjs(bValue);
          }

          console.log(`Comparing: ${aValue} and ${bValue}`);
  
          if (aValue < bValue) {
            return sortOrder === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortOrder === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      const sortedRes = sortReservations(filteredRes, sortKey, sortOrder);
      console.log("Sorted Reservations: ", sortedRes);
      // Pagination
      const itemsPerPage = 8;
      const totalPages = Math.ceil(sortedRes.length / itemsPerPage);
      const pagedRes = sortedRes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

      // Return the paginated and sorted response
      res.status(200).json({ 
        reservation: pagedRes, 
        totalPages, 
        currentPage: parseInt(page),
        sortKey,
        sortOrder,
      });
  } catch (err) {
      next(err);
  }
};


module.exports = reservationController