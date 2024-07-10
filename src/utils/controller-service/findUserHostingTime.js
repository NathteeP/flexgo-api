const dayjs = require("dayjs")
const accomService = require("../../service/accomService")
const { dayToMonthsOrYearService } = require("../dayToMonthsOrYearService")

module.exports.findUserHostingTime = async (userId) => {
    try {
        const userFirstCreatedAccom = await accomService.findStartedYearOfUser(userId)

        const dayjsObj = dayjs(userFirstCreatedAccom.createdAt.toString())

        const dayHosting = Math.abs(dayjsObj.diff(dayjs(), "d"))
        const host = dayToMonthsOrYearService(dayHosting)
        return host
    } catch (err) {
        return err
    }
}
