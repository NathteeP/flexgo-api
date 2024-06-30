const { Client } = require("@googlemaps/google-maps-services-js")
const client = new Client()
const types = ["bar", "cafe", "bakery", "night_club", "park", "restaurant", "shopping_mall", "supermarket", "tourist_attraction"]

const findPlacesService = async (address) => {
    try {
        const place = []
        for (let type of types) {
            const args = {
                params: {
                    key: process.env.GOOGLE_API_KEY,
                    location: address,
                    radius: 15000,
                    rankby: "prominence",
                    type: type,
                },
            }
            const { data } = await client.placesNearby(args)
            if (data.results.length >= 1) {
                const { results } = data
                const filteredArr = results.reduce((acc, curr) => {
                    const filterById = place.filter((el) => el.place_id === curr.place_id)
                    console.log("filterById", filterById)
                    if (filterById.length >= 1) {
                        return acc
                    }
                    if (!curr.rating || curr.rating < 3.5 || curr.user_ratings_total < 50) {
                        return acc
                    }
                    const objToPush = {}
                    objToPush.id = curr.place_id
                    objToPush.lat = curr.geometry.location.lat
                    objToPush.lng = curr.geometry.location.lng
                    objToPush.name = curr.name
                    objToPush.icon = curr.icon
                    objToPush.iconBgClr = curr.icon_background_color
                    acc.push(objToPush)
                    return acc
                }, [])
                const placeArr = filteredArr.length > 3 ? filteredArr.slice(0, 3) : filteredArr
                place.push(...placeArr)
            }
        }
        return place
    } catch (err) {
        console.log(err.data)
    }
}

module.exports = findPlacesService
