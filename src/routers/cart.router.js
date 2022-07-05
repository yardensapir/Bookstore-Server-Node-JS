import express from "express";
import userAuth from '../middlewares/user.auth.js';
import * as cartController from '../controllers/cart.controller.js'


const router = new express.Router()

router.get('/cart',userAuth, cartController.getUserCartInfo)
router.patch('/cart',userAuth, cartController.updateUserCart)
router.post('/cart/add-to-cart/',userAuth, cartController.addBookToCart)
router.post('/cart/checkout',userAuth,cartController.checkOut)



export default router