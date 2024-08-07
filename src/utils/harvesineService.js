const EARTH_RAD = 6371

// Major semiaxis
const WGS84_a = 6378137.0

// Minor semiaxis
const WGS84_b = 6356752.3

const degToRad = (degree) => (degree * Math.PI) / 180

const radToDeg = (radian) => (radian * 180) / Math.PI

const harvesineService = (lat1, lng1, lat2, lng2) => {
    const delta_phi = Math.abs(degToRad(lat1 - lat2))
    const delta_lambda = Math.abs(degToRad(lng1 - lng2))
    const a = Math.sin(delta_phi / 2) ** 2 + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(delta_lambda / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (EARTH_RAD * c).toFixed(3)
}

// Eath radius at given latitude
const WGS84EarthRadius = (lat) => {
    An = Math.pow(WGS84_a, 2) * Math.cos(lat)
    Bn = Math.pow(WGS84_b, 2) * Math.sin(lat)
    Ad = WGS84_a * Math.cos(lat)
    Bd = WGS84_b * Math.sin(lat)
    return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd))
}

const createBoundingBox = (lat, lng, distanceInKm) => {
    // This formula is not really accurate but guess is enough for small amount of km.
    const latRad = degToRad(lat)
    const lngRad = degToRad(lng)

    // Change distance into metre measurement unit
    const distance = distanceInKm * 1000

    // Find earth radius within the given latitude
    const radius = WGS84EarthRadius(latRad)
    // Find parallel earth radius
    const pradius = radius * Math.cos(latRad)

    const latMax = latRad + distance / radius
    const latMin = latRad - distance / radius
    const lngMax = lngRad + distance / pradius
    const lngMin = lngRad - distance / pradius

    // There is an error in distance Between min and max around 2 %
    // if distance is 10km. Then the error is 0.019. if 20 ==> 0.038, so forth.
    return { latMax: radToDeg(latMax), latMin: radToDeg(latMin), lngMax: radToDeg(lngMax), lngMin: radToDeg(lngMin) }
}

module.exports = { harvesineService, createBoundingBox }
