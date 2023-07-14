const express=require('express');
const router=express.Router();
const reviewController=require('../../controllers/review_controller')
const passport=require('passport')

router.post('/create',passport.checkAuthentication, reviewController.create);
router.post('/delete/:id',passport.checkAuthentication,reviewController.destroy);

module.exports=router;