const express=require('express');
const router=express.Router();
const StripeController=require('../../controllers/stripe_controller')
const passport=require('passport')
const stripe = require('stripe')('sk_test_51NS1E9SGZImZqwPWElOwBfpasGSSAHJN0DPp9AWbsKSz2beXXEofAhoUTgKFVi6xCK6UqARADilGv9Tca4YT7Dcx00GxL5GHOI')

router.post('/create-checkout-session', passport.checkAuthentication,StripeController.checkoutSession);

//webhooks
// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
const endpointsecret="whsec_ec999d496edf39047980a4a39cd21b696de87d23b27a600014197c2ffcca6d13"

router.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      break;
    case 'checkout.session.completed':
      data = event.data.object;
      eventType = event.type;
        stripe.customers
          .retrieve(data.customer)
          .then(async (customer) => {
            try {
              // CREATE ORDER
              // createOrder(customer, data);
              console.log('customer',customer);
              console.log('data',data);
            } catch (err) {
              console.log(typeof createOrder);
              console.log(err);
            }
          })
          .catch((err) => console.log(err.message));
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

module.exports=router;