const prisma = require("../models/prisma")

const feeService = {}

feeService.create = data => prisma.fee.create({data})
feeService.getFeeById = feeId => prisma.fee.findUnique({
    where:{id:feeId}
})
feeService.updateFeeById = (feeId, data) => prisma.fee.update({
    where:{id:feeId},data
})
feeService.findExistedFee = feeObj => prisma.fee.findFirst({where:feeObj})

module.exports = feeService