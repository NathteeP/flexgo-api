const { CustomError } = require("../config/error")
const prisma = require("../models/prisma")

const reservationService = {}

reservationService.generateId = async ()=> {
    const curDate = new Date()
    const year = curDate.getFullYear().toString().slice(-2)
    const month = (curDate.getMonth()+1).toString().padStart(2,'0')
    const day = curDate.getDate().toString().padStart(2,'0')

    const curDateStr = year + month + day

    let counter

    try {
            const dateCounter = await prisma.dateCounter.upsert({
                where:{date:curDateStr},
                update:{counter:{increment:1}},
                create:{date:curDateStr, counter:1}
            })
            counter = dateCounter.counter
        
        // generate Id = ปี เดือน วัน (6หลัก) + เลขนับจำนวนการจองใน database (4หลัก) + เลข random 1-99 (2หลัก)

        const generatedId = curDateStr + counter.toString().padStart(4,'0') + 
        Math.floor(Math.random()*100).toString().padStart(2,'0')
        return generatedId
    } catch (err) {
        throw new CustomError('Error generating Id','GeneratingError',400)
    } 
}

reservationService.create = data => prisma.reservation.create({data})


reservationService.checkIfDuplicate = (userId, checkInDate) => {
    console.log(checkInDate)
    return prisma.reservation.findFirst({where:{userId,checkInDate}})
}


module.exports = reservationService