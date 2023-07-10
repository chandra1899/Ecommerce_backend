const express=require('express');
const router=express.Router();
const StripeController=require('../../controllers/stripe_controller')
const passport=require('passport')

router.post('/create-checkout-session', passport.checkAuthentication,StripeController.checkoutSession);

module.exports=router;