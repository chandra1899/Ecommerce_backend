const express=require('express');
const router=express.Router();
const productController=require('../../controllers/product_controller')
const passport=require('passport')

router.post('/createproduct', productController.create);
router.get('/photo/:id', productController.photo);
router.get('/getParticularProducts', productController.getParticularProducts);
router.get('/getProductDetails/:id', productController.getProductDetails);
router.get('/getallproducts', productController.getallproducts);

module.exports=router;