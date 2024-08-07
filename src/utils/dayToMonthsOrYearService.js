module.exports.dayToMonthsOrYearService = (days) => {
    if (days > 30) {
        const monthHosting = days / 30
        if (monthHosting >= 12) {
            const yearHosting = Math.round(monthHosting / 12) + " years"
            return yearHosting
        }
        return Math.round(monthHosting) + " months"
    }
    return days + " days"
}
