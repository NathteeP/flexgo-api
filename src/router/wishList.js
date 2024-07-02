const express = require("express")
const wishListController = require("../controller/wishlist")
const authenticate = require("../middlewares/authenticate")

const wishListRouter = express.Router()

wishListRouter.get('/add/:accom_id', wishListController.create) 
wishListRouter.get('/', wishListController.getAllWishListRoom)
wishListRouter.delete('/delete/:accom_id', authenticate, wishListController.delete)

module.exports = wishListRouter