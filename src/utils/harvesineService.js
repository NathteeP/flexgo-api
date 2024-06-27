const EARTH_RAD = 6371

const degToRad = (degree) => (degree * Math.PI) / 180

const harvesineService = (lat1, lng1, lat2, lng2) => {
    const delta_phi = degToRad(lat1 - lat2)
    const delta_lambda = degToRad(lng1 - lng2)
    const a = Math.sin(delta_phi / 2) ** 2 + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(delta_lambda / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (EARTH_RAD * c).toFixed(3)
}

module.exports = harvesineService
