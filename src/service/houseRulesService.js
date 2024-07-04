const prisma = require("../models/prisma")
const houseRulesService = {}

houseRulesService.createRule = (data) =>
    prisma.houseRules.create({
        data,
    })

houseRulesService.getHouseRulesByAccomId = (accomId) =>
    prisma.houseRules.findFirst({
        where: {
            accomId,
        },
    })

houseRulesService.editHouseRules = (data, id) =>
    prisma.houseRules.update({
        data,
        where: {
            id,
        },
    })

houseRulesService.findHouseRulesById = (id) =>
    prisma.houseRules.findUnique({
        where: {
            id,
        },
    })

houseRulesService.findHouseRuleByAccomId = (accomId) =>
    prisma.houseRules.findFirst({
        where: {
            accomId,
        },
    })

module.exports = houseRulesService
