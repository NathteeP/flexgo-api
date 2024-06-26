const { CustomError } = require("../config/error")
const accomService = require("../service/accomService")
const houseRulesService = require("../service/houseRulesService")
const asyncWrapper = require("../utils/asyncWrapper")

const houseRulesController = {}

houseRulesController.createRules = asyncWrapper(async (req, res, next) => {
    if (!req.body) return next(new CustomError("There is no information provided.", "EmptyInfo", 400))
    if (!req.body.checkIn || !req.body.checkOut || !req.body.petsRule || !req.body.ageRule || !req.body.cancelPolicy)
        return next(new CustomError("Please provided require information", "InvalidInfo", 400))
    if (isNaN(req.body.accomId)) next(new CustomError("Information is invalid", "InvalidInfo", 400))

    const isAccomExists = await accomService.findAccomByAccomId(req.body.accomId)
    if (!isAccomExists) return next(new CustomError("Accommodation doesn't exists", "InvalidAccom", 400))
    if (isAccomExists.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unauthorized", 401))

    const response = await houseRulesService.createRule(req.body)
    res.status(201).json(response)
})

houseRulesController.findHouseRules = asyncWrapper(async (req, res, next) => {
    const isAccomExists = await accomService.findAccomByAccomId(+req.params.accom_id)
    if (!isAccomExists) return next(new CustomError("Accommodation doesn't exists", "InvalidAccom", 400))
    const response = await houseRulesService.getHouseRulesByAccomId(+req.params.accom_id)
    res.status(200).json(response)
})

houseRulesController.editHouseRules = asyncWrapper(async (req, res, next) => {
    if (!req.params.houserules_id || !req.body.accomId) return next(new CustomError("Please provide ID for editing", "MissingInfo", 400))
    if (!req.body) return next(new CustomError("Please provide information for editing.", "EmpytyInfo", 400))
    const houseRule = await houseRulesService.findHouseRulesById(+req.params.houserules_id)
    if (!houseRule || houseRule.accomId !== req.body.accomId) return next(new CustomError("This house_rules doesn't exists", "NonExistsData", 400))
    const user = await accomService.findUserIdByAccomId(houseRule.accomId)
    if (user.userId !== req.user.id) return next(new CustomError("Unauthorized", "Unauthorized", 401))
    const response = await houseRulesService.editHouseRules(req.body, houseRule.id)
    res.status(200).json(response)
})

module.exports = houseRulesController
