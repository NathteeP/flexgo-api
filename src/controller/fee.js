const feeService = require("../service/feeService")

const feeController = {}
/* req body:
{
hostFee: 0.10,
clientFee: 0.10
}
*/
feeController.createFee = async (req, res, next) => {
    try {
        const existedFee = await feeService.findExistedFee(req.body)

        if (existedFee) res.status(200).json(existedFee)
            
        else {
            const response = await feeService.create(req.body) 
            res.status(201).json(response)
        }
    } catch (err) {
        next(err)
    }
}

feeController.updateFee = async (req, res, next) => {
    try {
        const response = await feeService.updateFeeById(+req.params.fee_id, req.body)

        res.status(200).json(response)

    } catch (err) {
        next(err)
    }
}

feeController.getFeeById = async (req, res, next) => {
    try {
        const response = await feeService.getFeeById(+req.params.fee_id)

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

module.exports = feeController