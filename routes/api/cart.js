const express=require('express');
const router=express.Router();
const cartController=require('../../controllers/cart_controller')
const passport=require('passport')

router.post('/addProduct/:id',passport.checkAuthentication, cartController.addProduct);
router.get('/getProducts',passport.checkAuthentication, cartController.getProducts);
router.post('/deleteProduct/:id',passport.checkAuthentication, cartController.deleteProduct);

module.exports=router;