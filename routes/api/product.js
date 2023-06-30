const express=require('express');
const router=express.Router();
const productController=require('../../controllers/product_controller')
const passport=require('passport')
const formidable=require('express-formidable');

router.post('/createproduct',formidable(), productController.create);
router.get('/photo/:id', productController.photo);

module.exports=router;