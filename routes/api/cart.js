const express=require('express');
const router=express.Router();
const cartController=require('../../controllers/cart_controller')

router.post('/addProduct/:id', cartController.addProduct);

module.exports=router;