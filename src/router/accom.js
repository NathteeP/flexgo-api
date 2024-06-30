const express = require("express")
const accomController = require("../controller/accom")
const authenticate = require("../middlewares/authenticate")
const accomRouter = express.Router()

accomRouter.get("/allrooms/:accom_id", accomController.getAllRoomByAccomId)

accomRouter.get("/detail/:accom_id", accomController.getAccomDetailByAccomId)

accomRouter.post("/create", authenticate, accomController.verifyInfoAndFindNearbyPlaceCreate, accomController.createAccom)
// accomRouter.post("/create/photos", upload.fields([{ name: "accommodation", maxCount: 5 }]))
// GET All accom based on user locationrr
// post user lat lng ====> [{accom}] -->
// accomRouter.post("/getaccom/unsearch")
// {
//   id,
//   name,
//   district, province,
//   description,
//   review : [],
//   accomPhoto : []
// }

// GET All accom after user click search and provide location
// post user lat lng
// ได้ accom เอา accom ID ไปหา room ID แล้ว นำ room ID ไปเช็คใน reservation ว่ามี reservationID ไหนบ้าง
// ได้ reservation แล้วมาโยนไปหาใน review
// accomRouter.post("/getaccom/search")
// {
//   id,
//   accomPhoto : [],
//   name,
//   lat,lng
//   room : [
//     price : MIN-MAX
//   ]
//   review: [
//     (AVG(ratingtype(1-4)))
//   ]
// }

// user click on each accom
// accomRouter.get("/getaccom/:accomId")
// {
//   id,
//   accomPhoto : [],
//   name,
//   lat,lng,
//   accomNearbyPlaces : []
//   room : [
//     {
//       status : ACTIVE
//       roomBed : []
//       amenities : [],
//     },
//   ]
//   review: [
//     (AVG(ratingtype(1-4))),
//     COUNT(review)
//   ],
//   user : {
//     id
//   }
// }

// ===> room detail, host detail, review, accom

module.exports = accomRouter
