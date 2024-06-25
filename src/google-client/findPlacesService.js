const { Client } = require("@googlemaps/google-maps-services-js")
const client = new Client()

const findPlacesService = async (address) => {
    try {
        // const args = {
        //     params: {
        //         key: "AIzaSyBa3T_-jaozwy6c_7yKyDqjFRDuL-EJqQM",
        //         location: address,
        //         rankby: "prominence",
        //         radius: 500,
        //     },
        // }
        const types = ["bar", "cafe", "bakery", "night_club", "park", "restaurant", "shopping_mall", "supermarket", "tourist_attraction"]
        const place = []
        for (let type of types) {
            const args = {
                params: {
                    key: "AIzaSyBa3T_-jaozwy6c_7yKyDqjFRDuL-EJqQM",
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
                    if (filterById.length >= 1) {
                        return acc
                    }
                    if (!curr.rating || curr.rating < 3.5 || curr.user_ratings_total < 50) {
                        return acc
                    }
                    const objToPush = {}
                    objToPush.lat = curr.geometry.location.lat
                    objToPush.lng = curr.geometry.location.lng
                    objToPush.name = curr.name
                    objToPush.icon = curr.icon
                    objToPush.icon_background_color = curr.icon_background_color
                    objToPush.place_id = curr.place_id
                    objToPush.type = type
                    objToPush.rating = curr.rating
                    objToPush.user_ratings_total = curr.user_ratings_total
                    acc.push(objToPush)
                    return acc
                }, [])
                const placeArr = filteredArr.length > 3 ? filteredArr.slice(0, 3) : filteredArr
                place.push(...placeArr)
            }
        }
        console.log(place)
        console.log(place.length)
        // const place = type.reduce((acc, curr) => {
        //     const args = {
        //         params: {
        //             key: "AIzaSyBa3T_-jaozwy6c_7yKyDqjFRDuL-EJqQM",
        //             location: address,
        //             rankby: "prominence",
        //             radius: 500,
        //             type: curr,
        //         },
        //     }
        //     const response = client.placesNearby(args).then((r) => r)
        //     console.log(response)
        //     acc.push(data.results[0].slice(0, 5))
        //     return acc
        // }, [])
        // console.log(place)
        // data.results.reduce((acc,curr) => {
        //   const filteredObj = {}
        //   filteredObj.name = curr.name
        //   filteredObj.lat = curr.geometry.location.lat
        //   filteredObj.lng = curr.geometry.location.lng
        //   filteredObj.placeId = curr.place_id
        //   filteredObj.
        // }, [])
        // console.log(response.data.results)
        // console.log(response.data.results.length)
    } catch (err) {
        console.log(err.data)
    }
}

findPlacesService({ lat: 12.936443424714826, lng: 100.89245815388377 })

module.exports = findPlacesService
