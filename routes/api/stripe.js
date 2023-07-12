const express=require('express');
const router=express.Router();
const StripeController=require('../../controllers/stripe_controller')
const passport=require('passport')
const stripe = require('stripe')('sk_test_51NS1E9SGZImZqwPWElOwBfpasGSSAHJN0DPp9AWbsKSz2beXXEofAhoUTgKFVi6xCK6UqARADilGv9Tca4YT7Dcx00GxL5GHOI')

router.post('/create-checkout-session', passport.checkAuthentication,StripeController.checkoutSession);

//webhooks
// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the req body
const endpointsecret="whsec_ec999d496edf39047980a4a39cd21b696de87d23b27a600014197c2ffcca6d13"

router.post('/webhook', express.json({type: 'application/json'}),StripeController.webhook);

module.exports=router;