//=====================================================Imported Zone
const express = require("express")
const { json, urlencoded } = require("express")
const cors = require("cors")
const morgan = require("morgan")

//=====================================================local consted Zone

const { notFound } = require("../middlewares/notFound")
const { errorMiddlewares } = require("../middlewares/error")
const userRouter = require("../router/user")
const userPhotoRouter = require("../router/userPhoto")
const { CustomError } = require("../config/error")
const accomRouter = require("../router/accom")
const accomPhotoRouter = require("../router/accomPhoto")
const houseRulesRouter = require("../router/houseRules")
const roomRouter = require("../router/room")
const roomPhotoRouter = require("../router/roomPhoto")
const reservationRouter = require("../router/reservation")
const roomAmenitiesRouter = require("../router/roomAmenities")
const amenitiesRouter = require("../router/amenities")
const reviewRouter = require("../router/reviews")
const cookieParser = require("cookie-parser")
const passport = require("../config/passport")
const wishListRouter = require("../router/wishlist")

//=====================================================Server Zone
module.exports = function restApiServer(app) {
    //=====================================================Encoding Zone
    app.use(morgan("dev"))
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        }),
    )
    app.use(json())
    app.use(urlencoded({ extended: false }))
    app.use(express.static("public"))
    app.use(cookieParser())
    app.use(passport.initialize())

    //=====================================================Routing Zone
    app.use("/ping", (req, res, next) => {
        try {
            console.log("Checking the API status: Everything is OK")
            res.status(200).json("pong")
        } catch (error) {
            next(new CustomError("Ping Error", "NotFoundData", 500))
        }
    })
    app.use("/user", userRouter)
    app.use("/reservation", reservationRouter)
    app.use("/accom", accomRouter)
    app.use("/houseRules", houseRulesRouter)
    app.use("/accomPhoto", accomPhotoRouter)
    app.use("/room", roomRouter)
    app.use("/roomPhoto", roomPhotoRouter)
    app.use("/userPhoto", userPhotoRouter)
    app.use("/amenities/room", roomAmenitiesRouter)
    app.use("/amenities", amenitiesRouter)
    app.use("/reviews", reviewRouter)
    app.use("/wishlist", wishListRouter)
    //=====================================================Throwing Zone
    app.use(notFound)
    app.use(errorMiddlewares)
}
