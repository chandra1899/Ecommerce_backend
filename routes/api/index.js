const express=require('express');
const router=express.Router();
const homeController=require('../../controllers/home_controller')


router.use('/user',require('./user'))
router.use('/product',require('./product'))
router.use('/cart',require('./cart'))
router.use('/stripe',require('./stripe'))
router.use('/order',require('./order'))
router.use('/review',require('./review'))
router.use('/',homeController.home)

module.exports=router;