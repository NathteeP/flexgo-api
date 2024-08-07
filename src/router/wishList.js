const express = require("express")
const wishListController = require("../controller/wishList")
const authenticate = require("../middlewares/authenticate")

const wishListRouter = express.Router()

wishListRouter.get('/add/:accom_id',authenticate, wishListController.create) 
wishListRouter.get('/', authenticate, wishListController.getAllWishListRoom)
wishListRouter.delete('/delete/:accom_id', authenticate, wishListController.delete)

module.exports = wishListRouter