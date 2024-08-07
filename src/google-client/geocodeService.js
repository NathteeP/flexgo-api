const { Client } = require("@googlemaps/google-maps-services-js")
const asyncWrapper = require("../utils/asyncWrapper")
const client = new Client()

const geocodeService = {}

geocodeService.findLatLngFromAddress = async (address) => {
    try {
        const args = {
            params: {
                key: process.env.GOOGLE_API_KEY,
                address,
            },
        }
        const { data } = await client.geocode(args)
        return data.results[0].geometry.location
    } catch (err) {
        console.log(err.data)
    }
}

module.exports = geocodeService
