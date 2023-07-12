const express=require('express');
const router=express.Router();
const orderController=require('../../controllers/order_controller')
const passport=require('passport')

router.get('/getorders',passport.checkAuthentication, orderController.getOrders);

module.exports=router;